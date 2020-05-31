import { Interpreter, State, AnyEventObject } from "xstate"
import { PracticaMobileContext } from "./practica-mobile"

export interface BaseScreenProps {
  send: Interpreter<PracticaMobileContext>["send"]
  current: State<PracticaMobileContext, AnyEventObject, any, any>
}
