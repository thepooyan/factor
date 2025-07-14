import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from "../ui/alert-dialog"
import { ImCross } from 'solid-icons/im'
import { Component, createSignal, JSXElement, Match, Switch } from "solid-js"
import { Button } from "../ui/button"
import { CallbackStore } from "~/utility/utility"
import clsx from "clsx"
import { AiOutlineCheck, AiOutlineQuestion } from "solid-icons/ai"
import Spinner from "~/components/general/Spinner"

type Istate = "" | "prompt" | "fail" | "success" | "wait"
type modalArgs = {content: () => JSXElement, state?: Istate}
const [open, setOpen] = createSignal(false)
const [content, setContet] = createSignal<Component>(() => <></>)
const [state, setState] = createSignal<Istate>("")
const callbackStore = new CallbackStore()
let readyToOpen = true;
let waitingStack:modalArgs[] = []

export const closeModal = () => {
  setOpen(false)
}

const closeCleanup = () => {
  setContet(() => () => "")
  setState("")
  readyToOpen = true;

  let first = waitingStack.shift()
  first && callModal(first.content, first.state)
}

export const callModal = (content: (() => JSXElement), stateToBe?: Istate) => {
  if (!readyToOpen && state() !== "wait") return waitingStack.push({content: content, state: stateToBe})
  setOpen(true)
  setContet(() => () => content())
  stateToBe && setState(stateToBe)
  readyToOpen = false;
}

callModal.success = (msg: string = "با موفقیت انجام شد!") => callModal(() => msg, "success")
callModal.fail = (msg: string = "خطایی رخ داد! لطفا مجددا تلاش کنید") => callModal(() => msg, "fail")
callModal.wait = (msg: string = "لطفا کمی صبر کنید") => callModal(() => <div class="space-y-4"><p>{msg}</p><Spinner/></div>, "wait")
callModal.prompt = (msg: string = "Are you sure?") => {
  callModal(() => msg, "prompt");
  return {
    yes: (callback: ()=>void) => {
      callbackStore.setYes(callback)
      return {
        no: (callback: ()=>void) => {
          callbackStore.setNo(callback)
        }
      }
    },
    no: (callback: ()=>void) => {
      callbackStore.setNo(callback)
      return {
        yes: (callback: ()=>void) => {
          callbackStore.setYes(callback)
        }
      }
    }
  }
}

let titleStyle = "flex items-center justify-end gap-2 mr-10"
const title = () => {
  switch (state()) {
    case "fail":
      return <div class={clsx(titleStyle,"text-red")}> <ImCross/> </div>
    case "success":
      return <div class={clsx(titleStyle,"text-green")}> <AiOutlineCheck size={40}/> </div>
    case "prompt":
      return <div class={clsx(titleStyle,"text-orange")}> <AiOutlineQuestion size={40}/> </div>
  }
  return ""
}

const Modal = () => {
  return (
    <>
      <AlertDialog open={open()} onOpenChange={setOpen}>
        <AlertDialogContent class="!w-max" onanimationend={() => !open() && closeCleanup()}>
          <AlertDialogTitle>{title()}</AlertDialogTitle>
          <AlertDialogDescription>
            <p class="text-center text-md mb-2 mt-3">
              {content()("")}
            </p>
          </AlertDialogDescription>
            <Switch>
              <Match when={state() === "prompt"}>
                <div class="flex justify-center gap-2">
                  <Button size="sm" class="w-20" onclick={() => {callbackStore.callYes(); closeModal()}}>بله</Button>
                  <Button size="sm" class="w-20" variant="secondary" onclick={() => {callbackStore.callNo(); closeModal()}}>خیر</Button>
                </div>
              </Match>
            </Switch>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default Modal
