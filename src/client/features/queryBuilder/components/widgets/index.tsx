import { FieldType } from "../../types";
import { AmountCurrencyWidget } from "./AmountCurrencyWidget";
import { EnumWidget } from "./EnumWidget";
import { NumberWidget } from "./NumberWidget";
import { TextWidget } from "./TextWidget";

export const WIDGET_REGISTRY: Record<FieldType, React.ComponentType<any>> = {
  text: TextWidget,
  number: NumberWidget,
  amount: AmountCurrencyWidget,
  enum: EnumWidget,
};