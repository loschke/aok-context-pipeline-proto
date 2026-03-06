"use client"

import { useState, useCallback } from "react"

import type { ClusterPipelineRun, FileTreeNode } from "@/types/cluster-pipeline"
import { CLUSTER_PIPELINE_STEPS } from "@/types/cluster-pipeline"

interface SelectedFile {
  path: string
  name: string
  stepDir: string
}

interface WorkbenchState {
  pipelineState: ClusterPipelineRun | null
  activeStep: number
  fileTree: FileTreeNode[]
  selectedFile: SelectedFile | null
  expandedDirs: Set<string>
  panelMode: "actions" | "file"
  editMode: boolean
  fileContent: string | null
  editedContent: string | null
  isSaving: boolean
  isLoading: boolean
}

export function useClusterPipelineState(
  cluster: string,
  initialState: ClusterPipelineRun | null,
  initialTree: FileTreeNode[]
) {
  const [state, setState] = useState<WorkbenchState>({
    pipelineState: initialState,
    activeStep: findFirstReadyStep(initialState),
    fileTree: initialTree,
    selectedFile: null,
    expandedDirs: buildInitialExpanded(initialTree, initialState),
    panelMode: "actions",
    editMode: false,
    fileContent: null,
    editedContent: null,
    isSaving: false,
    isLoading: false,
  })

  const reload = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }))
    try {
      const [stateRes, treeRes] = await Promise.all([
        fetch(`/api/cluster-pipeline/state?cluster=${encodeURIComponent(cluster)}`),
        fetch(`/api/cluster-pipeline/files/tree?cluster=${encodeURIComponent(cluster)}`),
      ])
      if (stateRes.ok && treeRes.ok) {
        const newPipelineState = (await stateRes.json()) as ClusterPipelineRun
        const newTree = (await treeRes.json()) as FileTreeNode[]
        setState((prev) => ({
          ...prev,
          pipelineState: newPipelineState,
          fileTree: newTree,
          isLoading: false,
        }))
      }
    } catch {
      setState((prev) => ({ ...prev, isLoading: false }))
    }
  }, [cluster])

  const setActiveStep = useCallback((stepId: number) => {
    setState((prev) => {
      const newExpanded = new Set(prev.expandedDirs)
      const stepDef = CLUSTER_PIPELINE_STEPS.find((s) => s.id === stepId)
      if (stepDef) {
        newExpanded.add(`${cluster}/${stepDef.dirName}`)
      }
      return {
        ...prev,
        activeStep: stepId,
        panelMode: "actions",
        selectedFile: null,
        fileContent: null,
        editedContent: null,
        editMode: false,
        expandedDirs: newExpanded,
      }
    })
  }, [cluster])

  const selectFile = useCallback(async (path: string, name: string, stepDir: string) => {
    try {
      const response = await fetch(`/api/cluster-pipeline/files?path=${encodeURIComponent(path)}`)
      if (response.ok) {
        const content = await response.text()
        setState((prev) => ({
          ...prev,
          selectedFile: { path, name, stepDir },
          fileContent: content,
          editedContent: null,
          editMode: false,
          panelMode: "file",
        }))
      }
    } catch {
      // ignore
    }
  }, [])

  const toggleDir = useCallback((path: string) => {
    setState((prev) => {
      const newExpanded = new Set(prev.expandedDirs)
      if (newExpanded.has(path)) {
        newExpanded.delete(path)
      } else {
        newExpanded.add(path)
      }
      return { ...prev, expandedDirs: newExpanded }
    })
  }, [])

  const setEditMode = useCallback((editMode: boolean) => {
    setState((prev) => ({ ...prev, editMode }))
  }, [])

  const setEditedContent = useCallback((content: string) => {
    setState((prev) => ({ ...prev, editedContent: content }))
  }, [])

  const saveFile = useCallback(async () => {
    const { selectedFile, editedContent } = state
    if (!selectedFile || editedContent === null) return

    setState((prev) => ({ ...prev, isSaving: true }))
    try {
      const response = await fetch(`/api/cluster-pipeline/files?path=${encodeURIComponent(selectedFile.path)}`, {
        method: "PUT",
        headers: { "Content-Type": "text/markdown" },
        body: editedContent,
      })
      if (response.ok) {
        setState((prev) => ({
          ...prev,
          fileContent: editedContent,
          editedContent: null,
          isSaving: false,
        }))
      }
    } catch {
      setState((prev) => ({ ...prev, isSaving: false }))
    }
  }, [state])

  const backToActions = useCallback(() => {
    setState((prev) => ({
      ...prev,
      panelMode: "actions",
      selectedFile: null,
      fileContent: null,
      editedContent: null,
      editMode: false,
    }))
  }, [])

  const handleStepComplete = useCallback(() => {
    reload()
  }, [reload])

  const isDirty = state.editedContent !== null && state.editedContent !== state.fileContent

  return {
    ...state,
    isDirty,
    setActiveStep,
    selectFile,
    toggleDir,
    setEditMode,
    setEditedContent,
    saveFile,
    backToActions,
    handleStepComplete,
    reload,
  }
}

function findFirstReadyStep(state: ClusterPipelineRun | null): number {
  if (!state) return 1
  const ready = state.steps.find((s) => s.status === "ready")
  if (ready) return ready.id
  const lastCompleted = [...state.steps].reverse().find((s) => s.status === "completed")
  return lastCompleted?.id || 1
}

function buildInitialExpanded(tree: FileTreeNode[], state: ClusterPipelineRun | null): Set<string> {
  const expanded = new Set<string>()
  if (!state) return expanded

  const target = findFirstReadyStep(state)
  const stepDef = CLUSTER_PIPELINE_STEPS.find((s) => s.id === target)
  if (stepDef) {
    const dir = tree.find((n) => n.name === stepDef.dirName)
    if (dir) expanded.add(dir.path)
  }

  return expanded
}
