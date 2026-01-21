import { SelectItem } from '@shared/component/ui/select.tsx';
import {OptionItem, StaticOptionItem} from '@shared/types/general.ts';
import { JSX } from 'react';

export function getSelectOptions<T>(list: OptionItem<T>[]): JSX.Element[] {
  if (!Array.isArray(list) || list.length === 0) {
    return [
      <SelectItem value="notSelected" key="no-options" disabled={true}>
        Mavjud emas
      </SelectItem>,
    ];
  }

  return list
      .map((option) =>
          option?.id ? (
              <SelectItem value={String(option.id)} key={String(option.id) || crypto.randomUUID()}>
                {option.name}
              </SelectItem>
          ) : null,
      )
      .filter(Boolean) as JSX.Element[];
}


export function getSelectStaticOptions(list: StaticOptionItem[]): JSX.Element[] {
    if (!Array.isArray(list) || list.length === 0) {
        return [
            <SelectItem value="notSelected" key="no-options" disabled={true}>
                Mavjud emas
            </SelectItem>,
        ];
    }

    return list
        .map((option) =>
            option?.value ? (
                <SelectItem value={String(option.value)} key={String(option.value) || crypto.randomUUID()}>
                    {option.label}
                </SelectItem>
            ) : null,
        )
        .filter(Boolean) as JSX.Element[];
}
