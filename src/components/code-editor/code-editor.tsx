import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Editor from "@monaco-editor/react";
import { sampleSourceCode, sampleTargetCode } from "@/lib/const";
import { CodeEditorContext } from "@/context/code-editor-context";
import styles from "./code-editor.module.css";

export function CodeEditor({
  triggerChild,
}: {
  triggerChild: React.ReactNode;
}) {
  const [selectedLanguage, setSelectedLanguage] =
    React.useState<string>("javascript");

  const {
    sourceCode,
    updateSourceCode,
    targetCode,
    updateTargetCode,
    editorTheme,
  } = React.useContext(CodeEditorContext);

  return <></>;
  // <Drawer>
  //   <DrawerTrigger asChild>{triggerChild}</DrawerTrigger>
  //   <DrawerContent>
  //     <DrawerHeader className="flex justify-between">
  //       <div>
  //         <DrawerTitle>Edit your code</DrawerTitle>
  //         <DrawerDescription>
  //           Stary typing or paste two different codes.
  //         </DrawerDescription>
  //       </div>
  //       <div>
  //         <div>
  //           <Select
  //             defaultValue={selectedLanguage}
  //             onValueChange={setSelectedLanguage}
  //           >
  //             <SelectTrigger className="w-[180px]">
  //               <SelectValue placeholder="Choose Language" />
  //             </SelectTrigger>
  //             <SelectContent>
  //               <SelectGroup>
  //                 <SelectLabel>Choose Language</SelectLabel>
  //                 <SelectItem value="javascript">Javascript</SelectItem>
  //                 <SelectItem value="typescript">Typescript</SelectItem>
  //                 <SelectItem value="python">Python</SelectItem>
  //                 <SelectItem value="go">Go Lang</SelectItem>
  //                 <SelectItem value="php">PHP</SelectItem>
  //               </SelectGroup>
  //             </SelectContent>
  //           </Select>
  //         </div>
  //       </div>
  //     </DrawerHeader>
  //     <div className="flex">
  //       <Editor
  //         height="400px"
  //         defaultLanguage="javascript"
  //         defaultValue={sampleSourceCode}
  //         value={sourceCode}
  //         onChange={(value?: string) => updateSourceCode(value)}
  //         language={selectedLanguage}
  //         theme={editorTheme}
  //         width="50vw"
  //       />
  //       <Editor
  //         height="400px"
  //         defaultLanguage="javascript"
  //         defaultValue={sampleTargetCode}
  //         value={targetCode}
  //         onChange={(value?: string) => updateTargetCode(value)}
  //         language={selectedLanguage}
  //         theme={editorTheme}
  //         width="50vw"
  //       />
  //     </div>
  //     <DrawerFooter>
  //       <DrawerClose asChild>
  //         <Button variant="outline">close</Button>
  //       </DrawerClose>
  //     </DrawerFooter>
  //   </DrawerContent>
  // </Drawer>
}
