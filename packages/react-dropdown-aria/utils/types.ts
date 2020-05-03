import { ReactNode } from 'react';
import { StyleKeys } from './constants';
import { OptionItemProps } from '../components/OptionItem';

export type Maybe<T> = T | null | undefined;

export interface ExtraState { [key: string]: any };

export type StyleKey = keyof typeof StyleKeys;

type StyleFunction = (base: {}, state: DropdownStyleDependantState, extraState?: {}) => {};
export type GetStyleFunction = (key: StyleKey, extraState?: ExtraState) => string;

export type OptionRendererFunction = (
  props: OptionItemProps,
  getStyle: GetStyleFunction,
) => JSX.Element;

export type OnOptionClicked = (e: React.MouseEvent<HTMLDivElement>) => void;

export type ItemRenderer = (
  props: OptionItemProps,
) => JSX.Element;

export interface DropdownStyle {
  Arrow?: StyleFunction,
  DropdownButton?: StyleFunction,
  DisplayedValue?: StyleFunction,
  DropdownWrapper?: StyleFunction,
  GroupContainer?: StyleFunction,
  GroupHeading?: StyleFunction,
  GroupDivider?: StyleFunction,
  OptionContainer?: StyleFunction,
  OptionItem?: StyleFunction,
};

export interface Option {
  ariaLabel?: string,
  className?: string,
  title?: string,
  value: string,
  iconClass?: string,
}

export interface OptionGroup {
  label: string,
  groupOptions: Option[],
}

export type DropdownOption = Option | OptionGroup;

export interface DropdownStyleDependantState {
  open: boolean,
  focusedIndex: number,
  dropdownFocused: boolean,
}

export interface DropdownState extends DropdownStyleDependantState {
  searchTerm: string,
};

export interface DropdownProps {
  ariaDescribedBy: string,
  ariaLabel: string,
  ariaLabelledBy: string,
  arrowRenderer: (open: boolean) => ReactNode,
  className: string,
  centerText: boolean,
  contentClassName: string,
  disabled: boolean,
  height: number,
  hideArrow: boolean,
  id: string,
  maxContentHeight: number,
  openUp: boolean,
  options: DropdownOption[],
  optionItemRenderer: OptionRendererFunction,
  pageKeyTraverseSize: number,
  placeholder: string,
  searchable: boolean,
  value: string,
  selectedValueClassName: string,
  onChange: (option: Option) => void,
  style: DropdownStyle,
  width: number,
}
