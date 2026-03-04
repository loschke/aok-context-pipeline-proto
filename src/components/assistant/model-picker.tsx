"use client"

import { useCallback, useState } from "react"
import { Bot } from "lucide-react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  ModelSelectorLogo,
} from "@/components/ai-elements/model-selector"
import { PromptInputButton } from "@/components/ai-elements/prompt-input"
import { MODELS, getModelConfig } from "@/config/models"

interface ModelPickerProps {
  selectedModelId: string
  onSelect: (modelId: string) => void
}

/** Group models by providerLabel, preserving array order. */
function groupByProvider() {
  const groups: { label: string; models: typeof MODELS }[] = []
  const seen = new Map<string, typeof MODELS>()
  for (const m of MODELS) {
    let arr = seen.get(m.providerLabel)
    if (!arr) {
      arr = []
      seen.set(m.providerLabel, arr)
      groups.push({ label: m.providerLabel, models: arr })
    }
    arr.push(m)
  }
  return groups
}

const MODEL_GROUPS = groupByProvider()

export function ModelPicker({ selectedModelId, onSelect }: ModelPickerProps) {
  const [open, setOpen] = useState(false)
  const selected = getModelConfig(selectedModelId)

  const handleSelect = useCallback(
    (id: string) => {
      onSelect(id)
      setOpen(false)
    },
    [onSelect]
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <PromptInputButton tooltip={selected?.name ?? "Modell waehlen"}>
          <Bot className="size-4" />
        </PromptInputButton>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="start"
        className="w-72 p-0"
      >
        <Command>
          <CommandList>
            {MODEL_GROUPS.map((group) => (
              <CommandGroup key={group.label} heading={group.label}>
                {group.models.map((model) => (
                  <CommandItem
                    key={model.id}
                    value={`${model.name} ${model.providerLabel}`}
                    onSelect={() => handleSelect(model.id)}
                    className="gap-2.5"
                  >
                    <ModelSelectorLogo provider={model.provider} />
                    <span className="flex-1 text-sm">{model.name}</span>
                    {model.id === selectedModelId && (
                      <span className="text-primary text-xs">✓</span>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
