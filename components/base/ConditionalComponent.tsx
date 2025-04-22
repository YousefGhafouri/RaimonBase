import { ReactNode } from "react";

type BaseProps<T extends {} = {}, U extends {} = {}> = {
  condition: boolean;
  render?: React.FC<T>;
  renderProps?: T;
  primaryProps?: U;
};

type WithPrimary<T extends {} = {}, U extends {} = {}> = BaseProps<T, U> & {
  primary: React.FC<U>;
  children?: never;
};

type WithChildren<T extends {} = {}, U extends {} = {}> = BaseProps<T, U> & {
  children?: React.FC<U>;
  primary?: never;
};

type ConditionalComponentProps<T extends {} = {}, U extends {} = {}> =
  | WithPrimary<T, U>
  | WithChildren<T, U>;

export default function ConditionalComponent<
  T extends {} = {},
  U extends {} = {}
>({
  condition,
  children,
  primary: Primary = children,
  primaryProps,
  render: Render,
  renderProps,
}: ConditionalComponentProps<T, U>) {
  if (condition && Render) return <Render {...(renderProps ?? ({} as T))} />;
  if (Primary) return <Primary {...(primaryProps ?? ({} as U))} />;
  return null;
}
