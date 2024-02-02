"use client";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import ReactDiffViewer, {
  DiffMethod,
  ReactDiffViewerStylesOverride,
} from "react-diff-viewer";
import Prism from "prismjs";
import "../styles/prism.css";
import {
  CameraIcon,
  MessageCircle,
  MessageCircleOff,
  MoonIcon,
  SplitIcon,
  SunIcon,
  TreesIcon,
} from "lucide-react";
import { toPng } from "html-to-image";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Editor from "@monaco-editor/react";

import { CodeEditor } from "@/components/code-editor";

export const sampleSourceCode = `export const OldCode = () => {
  // Not so amazing code
  // Change me
};`;

export const sampleTargetCode = `export const NewCode = () => {
  // better code maybe?
  // Change me
};`;

export default function Home() {
  const [sourceCode, setSourceCode] = useState<string>("");
  const [targetCode, setTargetCode] = useState<string>("");
  const [editorDarkMode, setEditorDarkMode] = useState<boolean>(true);
  const [editorSplitView, setEditorSplitView] = useState<boolean>(true);
  const [showEditorHeader, setShowEditorHeader] = useState<boolean>(true);

  const updateSourceCode = (value?: string) => {
    setSourceCode(value || sampleSourceCode);
  };

  const updateTargetCode = (value?: string) => {
    setTargetCode(value || sampleTargetCode);
  };

  const toggleEditorDarkMode = () => {
    setEditorDarkMode(!editorDarkMode);
  };

  const toggleSplitView = () => {
    setEditorSplitView(!editorSplitView);
  };

  const toggleEditorHeader = () => {
    setShowEditorHeader(!showEditorHeader);
  };

  const captureDiffImage = async () => {
    const node = document.getElementById("diff-view") as HTMLElement;
    const dataUrl = await toPng(node);
    const link = document.createElement("a");
    link.download = "diff.png";
    link.href = dataUrl;
    link.click();
  };

  const prismTest = (str: string) => {
    if (!str) str = "";
    return Prism.highlight(str, Prism.languages.javascript, "javascript");
  };

  const highlightSyntax = (str: string) => (
    <pre
      style={{ display: "inline" }}
      dangerouslySetInnerHTML={{
        __html: prismTest(str),
      }}
    />
  );

  const newStyles: ReactDiffViewerStylesOverride = {
    variables: {
      dark: {
        wordAddedBackground: "#15803d",
        wordRemovedBackground: "#991b1b",
      },
      light: {
        // wordAddedBackground: "#15803d",
        // wordRemovedBackground: "#991b1b",

        //defaults
        diffViewerBackground: "#fff",
        addedBackground: "#e6ffed",
        addedColor: "#24292e",
        removedBackground: "#ffeef0",
        removedColor: "#24292e",
        wordAddedBackground: "#acf2bd",
        wordRemovedBackground: "#fdb8c0",
        addedGutterBackground: "#cdffd8",
        removedGutterBackground: "#ffdce0",
        gutterBackground: "#f7f7f7",
        gutterBackgroundDark: "#f3f1f1",
        highlightBackground: "#fffbdd",
        highlightGutterBackground: "#fff5b1",
        codeFoldGutterBackground: "#dbedff",
        codeFoldBackground: "#f1f8ff",
        emptyLineBackground: "#fafbfc",
      },
    },
    line: {
      padding: "10px 2px",
      "&:hover": {
        background: "#a26ea1",
      },
    },
  };

  const leftHeadingBar = <>Before</>;

  const rightHeadingBar = <>After</>;

  return (
    <main className="h-full bg-slate-800 min-w-[1024px]">
      <div>
        <CodeEditor
          targetCode={targetCode}
          sourceCode={sourceCode}
          updateSourceCode={updateSourceCode}
          updateTargetCode={updateTargetCode}
        />
        <div className={cn("mx-12 mt-12")}>
          <div className="flex justify-end space-x-4 p-2 items-center bg-[#2F323E]">
            <div className="camera">
              <CameraIcon
                className="w-6 h-6 text-slate-200 cursor-pointer"
                onClick={captureDiffImage}
              />
            </div>
            <div className="cursor-pointer">
              {showEditorHeader ? (
                <MessageCircle
                  className="w-6 h-6 text-slate-200"
                  onClick={toggleEditorHeader}
                />
              ) : (
                <MessageCircleOff
                  className="w-6 h-6 text-slate-200"
                  onClick={toggleEditorHeader}
                />
              )}
            </div>
            <div className="cursor-pointer">
              {editorSplitView ? (
                <TreesIcon
                  className="w-6 h-6 text-slate-200"
                  onClick={toggleSplitView}
                />
              ) : (
                <SplitIcon
                  className="w-6 h-6 text-slate-200"
                  onClick={toggleSplitView}
                />
              )}
            </div>
            <div className="cursor-pointer">
              {editorDarkMode ? (
                <SunIcon
                  className="w-6 h-6 text-slate-200"
                  onClick={toggleEditorDarkMode}
                />
              ) : (
                <MoonIcon
                  className="w-6 h-6 text-slate-200"
                  onClick={toggleEditorDarkMode}
                />
              )}
            </div>
            {/* <Button>Toggle Dark Mode</Button> */}
          </div>
          <div
            id="diff-view"
            className="flex items-center p-16 pl-24 pr-24 bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 min-h-[400px]"
          >
            <ReactDiffViewer
              styles={newStyles}
              oldValue={sourceCode || sampleSourceCode}
              newValue={targetCode || sampleTargetCode}
              splitView={editorSplitView}
              useDarkTheme={editorDarkMode}
              leftTitle={showEditorHeader ? undefined : leftHeadingBar}
              rightTitle={showEditorHeader ? undefined : rightHeadingBar}
              renderContent={highlightSyntax}
              disableWordDiff={false}
              compareMethod={DiffMethod.WORDS}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
