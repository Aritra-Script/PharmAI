// import React, { useState, KeyboardEvent } from "react";
// import { motion } from "framer-motion";
// import { FileUploader } from "../molecules/FileUploader";
// import { MoleculeViewer } from "../molecules/MoleculeViewer";
// import { AnalysisChart } from "../molecules/AnalysisChart";
// import { useTheme } from "../../contexts/ThemeContext";
// import { Layout } from "../Layout";

// interface ChatMessage {
//   id: number;
//   sender: "user" | "assistant";
//   text: string;
// }

// export function Dashboard() {
//   // Tabs
//   const [activeTab, setActiveTab] = useState("PharmaGenius");

//   // Upload state
//   const [uploadedFile, setUploadedFile] = useState<File | null>(null);

//   // Visualise & Predict state
//   const [smiles, setSMILES] = useState("");
//   const [showMolecule, setShowMolecule] = useState(false);

//   // Chat state (PharmaGenius tab)
//   const [messages, setMessages] = useState<ChatMessage[]>([
//     {
//       id: 1,
//       sender: "assistant",
//       text: "Hi, I’m PharmaGenius. How can I assist you in your drug discovery process today?",
//     },
//   ]);
//   const [userInput, setUserInput] = useState("");

//   /**
//    * Handle file upload in "Upload" tab
//    */
//   const handleFileUpload = (file: File) => {
//     setUploadedFile(file);
//     console.log("File uploaded:", file.name);
//   };

//   /**
//    * Handle SMILES form submission in "Visualise & Predict" tab
//    * This is the original code you had that worked well
//    */
//   const handleSubmitSMILES = (event: React.FormEvent) => {
//     event.preventDefault();
//     const formData = new FormData(event.target as HTMLFormElement);
//     const smilesData = formData.get("smiles") as string;

//     console.log("SMILES Data:", smilesData);
//     if (smilesData) {
//       setSMILES(smilesData); // Update state with submitted value
//       setShowMolecule(true); // Show molecule after submission
//     }
//   };

//   /**
//    * WhatsApp-like Chat: Send message to backend (PharmaGenius tab)
//    */
//   const handleSend = async () => {
//     if (!userInput.trim()) return;

//     // 1. Add user's message to local chat
//     const userMsg: ChatMessage = {
//       id: Date.now(),
//       sender: "user",
//       text: userInput,
//     };
//     setMessages((prev) => [...prev, userMsg]);

//     try {
//       // 2. Call your backend at /api/chat
//       const response = await fetch("/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: userInput }),
//       });
//       const data = await response.json();

//       // 3. Add assistant's reply
//       const assistantMsg: ChatMessage = {
//         id: Date.now() + 1,
//         sender: "assistant",
//         text: data.reply || "Sorry, I couldn't understand that.",
//       };
//       setMessages((prev) => [...prev, assistantMsg]);
//     } catch (error) {
//       console.error("Error calling /api/chat:", error);
//       // Show fallback message
//       const errorMsg: ChatMessage = {
//         id: Date.now() + 2,
//         sender: "assistant",
//         text: "Oops! Something went wrong. Please try again later.",
//       };
//       setMessages((prev) => [...prev, errorMsg]);
//     }

//     // Clear input
//     setUserInput("");
//   };

//   /**
//    * Allow "Enter" key to send message
//    */
//   const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   return (
//     <div className="p-6 space-y-6">
//       {/* Navigation Tabs */}
//       {/* <div className="flex space-x-2">
//         {["upload", "Visualise & Predict", "PharmaGenius"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-4 py-2 rounded-lg capitalize transition-colors ${
//               activeTab === tab
//                 ? "bg-primary text-primary-foreground"
//                 : "bg-background hover:bg-primary/10"
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div> */}

//       {/* Main Content Area */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="glassmorphism p-6 flex flex-col space-y-6"
//       >
//         {/* -------------------------------------------
//             UPLOAD TAB
//         ------------------------------------------- */}
//         {activeTab === "upload" && (
//           <div className="space-y-4">
//             <h2 className="text-xl font-semibold">Upload Molecular Data</h2>
//             <FileUploader onFileUpload={handleFileUpload} />
//             {uploadedFile && (
//               <p className="text-sm text-gray-300">
//                 Uploaded File: {uploadedFile.name}
//               </p>
//             )}
//           </div>
//         )}

//         {/* -------------------------------------------
//             Visualise & Predict TAB (RESTORED ORIGINAL CODE)
//         ------------------------------------------- */}
//         {activeTab === "Visualise & Predict" && (
//           <div className="space-y-4 w-full flex flex-col gap-6">
//             <h2 className="text-xl font-semibold">3D Molecule Viewer</h2>
//             <div className="h-[700px] w-full mt-4 flex flex-col items-center justify-center">
//               {showMolecule && <MoleculeViewer smiles={smiles} />}
//             </div>
//             <form
//               className="w-full space-y-4 mt-16"
//               onSubmit={handleSubmitSMILES}
//             >
//               <h2 className="text-lg font-semibold">
//                 Enter the SMILES String of the compound
//               </h2>
//               <input
//                 name="smiles"
//                 className="w-full text-black focus:outline-2 rounded-lg px-4 py-2"
//                 placeholder="Example [BH3-][N+]1(C)CC[N+]([BH3-])(C)CC1"
//               />
//               <button
//                 className="bg-primary w-full px-4 py-2 rounded-lg text-primary-foreground transition-colors duration-200 hover:bg-primary/10"
//                 type="submit"
//               >
//                 Submit
//               </button>
//             </form>
//           </div>
//         )}

//         {/* -------------------------------------------
//     PharmaGenius TAB
// ------------------------------------------- */}
//         {activeTab === "PharmaGenius" &&
//           (() => {
//             const { theme } = useTheme();

//             // Define classes based on the current theme
//             const chatContainerClass =
//               theme === "dark" ? "bg-black" : "bg-gray-100";
//             const chatHeaderClass =
//               theme === "dark"
//                 ? "bg-purple-600 text-white"
//                 : "bg-purple-500 text-white";
//             const assistantBubbleClass =
//               theme === "dark"
//                 ? "bg-[#1a1a1a] text-white"
//                 : "bg-gray-200 text-black";
//             const userBubbleClass =
//               theme === "dark"
//                 ? "bg-purple-600 text-white"
//                 : "bg-purple-400 text-white";
//             const inputContainerClass =
//               theme === "dark" ? "bg-black" : "bg-gray-100";
//             const inputBoxClass =
//               theme === "dark"
//                 ? "bg-[#121212] text-white"
//                 : "bg-white text-black";
//             const sendButtonClass =
//               theme === "dark"
//                 ? "bg-purple-600 text-white hover:bg-purple-500"
//                 : "bg-purple-500 text-white hover:bg-purple-400";

//             return (
//               <div className="flex flex-col space-y-6">
//                 {/* WhatsApp-Style Chat */}
//                 <div
//                   className={`w-full h-[500px] ${chatContainerClass} rounded-lg flex flex-col`}
//                 >
//                   {/* Chat Header */}
//                   <div
//                     className={`${chatHeaderClass} p-4 rounded-t-lg flex items-center justify-center`}
//                   >
//                     <h2 className="text-xl font-bold">PharmaGenius Chatbot</h2>
//                   </div>

//                   {/* Chat Messages */}
//                   <div className="flex-1 overflow-y-auto p-4 space-y-4">
//                     {messages.map((msg) => (
//                       <div
//                         key={msg.id}
//                         className={`flex ${
//                           msg.sender === "assistant"
//                             ? "justify-start"
//                             : "justify-end"
//                         }`}
//                       >
//                         {/* Chat Bubble */}
//                         <div
//                           className={`max-w-sm p-3 rounded-xl ${
//                             msg.sender === "assistant"
//                               ? assistantBubbleClass
//                               : userBubbleClass
//                           }`}
//                           style={{ whiteSpace: "pre-wrap" }}
//                         >
//                           {msg.text}
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Chat Input */}
//                   <div
//                     className={`p-4 rounded-b-lg border-t border-purple-800 flex space-x-2 ${inputContainerClass}`}
//                   >
//                     <input
//                       type="text"
//                       className={`flex-1 p-3 rounded-md focus:outline-none ${inputBoxClass}`}
//                       placeholder="Type your message here..."
//                       value={userInput}
//                       onChange={(e) => setUserInput(e.target.value)}
//                       onKeyDown={handleKeyDown}
//                     />
//                     <button
//                       onClick={handleSend}
//                       className={`px-4 py-2 rounded-md transition-colors ${sendButtonClass}`}
//                     >
//                       Send
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })()}
//       </motion.div>
//     </div>
//   );
// }
import React, { useState, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import { FileUploader } from "../molecules/FileUploader";
import { MoleculeViewer } from "../molecules/MoleculeViewer";
import { AnalysisChart } from "../molecules/AnalysisChart";
import { useTheme } from "../../contexts/ThemeContext";

interface ChatMessage {
  id: number;
  sender: "user" | "assistant";
  text: string;
}

// The type we expect from Layout's Outlet context
interface LayoutContext {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export function Dashboard() {
  // Retrieve activeTab from Layout
  const { activeTab } = useOutletContext<LayoutContext>();

  // Upload state
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Visualise & Predict state
  const [smiles, setSMILES] = useState("");
  const [showMolecule, setShowMolecule] = useState(false);

  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "assistant",
      text: "Hi, I’m PharmaGenius. How can I assist you in your drug discovery process today?",
    },
  ]);
  const [userInput, setUserInput] = useState("");

  // Theming for the PharmaGenius tab
  const { theme } = useTheme();

  // File upload
  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    console.log("File uploaded:", file.name);
  };

  // SMILES submission
  const handleSubmitSMILES = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const smilesData = formData.get("smiles") as string;

    if (smilesData) {
      setSMILES(smilesData);
      setShowMolecule(true);
    }
  };

  // Chat send
  const handleSend = async () => {
    if (!userInput.trim()) return;

    // User message
    const userMsg: ChatMessage = {
      id: Date.now(),
      sender: "user",
      text: userInput,
    };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });
      const data = await response.json();

      // Assistant message
      const assistantMsg: ChatMessage = {
        id: Date.now() + 1,
        sender: "assistant",
        text: data.reply || "Sorry, I couldn't understand that.",
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error("Error calling /api/chat:", error);
      const errorMsg: ChatMessage = {
        id: Date.now() + 2,
        sender: "assistant",
        text: "Oops! Something went wrong. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    }

    setUserInput("");
  };

  // Enter key
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  // Theme-based classes for PharmaGenius chat
  const chatContainerClass = theme === "dark" ? "bg-black" : "bg-gray-100";
  const chatHeaderClass =
    theme === "dark" ? "bg-purple-600 text-white" : "bg-purple-500 text-white";
  const assistantBubbleClass =
    theme === "dark" ? "bg-[#1a1a1a] text-white" : "bg-gray-200 text-black";
  const userBubbleClass =
    theme === "dark" ? "bg-purple-600 text-white" : "bg-purple-400 text-white";
  const inputContainerClass = theme === "dark" ? "bg-black" : "bg-gray-100";
  const inputBoxClass =
    theme === "dark" ? "bg-[#121212] text-white" : "bg-white text-black";
  const sendButtonClass =
    theme === "dark"
      ? "bg-purple-600 text-white hover:bg-purple-500"
      : "bg-purple-500 text-white hover:bg-purple-400";

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glassmorphism p-6 flex flex-col space-y-6"
      >
        {/* Upload Tab */}
        {activeTab === "upload" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Upload Molecular Data</h2>
            <FileUploader onFileUpload={handleFileUpload} />
            {uploadedFile && (
              <p className="text-sm text-gray-300">
                Uploaded File: {uploadedFile.name}
              </p>
            )}
          </div>
        )}

        {/* Visualise & Predict Tab */}
        {activeTab === "Visualise & Predict" && (
          <div className="space-y-4 w-full flex flex-col gap-6">
            <h2 className="text-xl font-semibold">
              3D Molecule Viewer & <a href="https://en.wikipedia.org/wiki/ADMET">ADMET</a> Property Predictor
            </h2>
            <form
              className="w-full space-y-4 mt-16"
              onSubmit={handleSubmitSMILES}
            >
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-normal">Enter the <a href="https://en.wikipedia.org/wiki/Simplified_Molecular_Input_Line_Entry_System">SMILES</a></h2>
                <span className="text-lg font-thin">
                  (Simplified Molecular Input Line Entry System)
                </span>
                <h2 className="text-lg font-normal">
                  String of the compound
                </h2>
              </div>

              <input
                name="smiles"
                className="w-full text-black focus:outline-2 rounded-lg px-4 py-2"
                placeholder="Example [BH3-][N+]1(C)CC[N+]([BH3-])(C)CC1"
              />
              <button
                className="bg-primary w-full px-4 py-2 rounded-lg text-primary-foreground transition-colors duration-200 hover:bg-primary/10"
                type="submit"
              >
                Submit
              </button>
            </form>

            <div className="h-[700px] w-full mt-4 flex flex-col items-center justify-center">
              {showMolecule && <MoleculeViewer smiles={smiles} />}
            </div>
          </div>
        )}

        {/* PharmaGenius Tab (WhatsApp-Style Chat) */}
        {activeTab === "PharmaGenius" && (
          <div className="flex flex-col space-y-6">
            <div
              className={`w-full h-[500px] ${chatContainerClass} rounded-lg flex flex-col`}
            >
              {/* Chat Header */}
              <div
                className={`${chatHeaderClass} p-4 rounded-t-lg flex items-center justify-center`}
              >
                <h2 className="text-xl font-bold">PharmaGenius Assistant</h2>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender === "assistant"
                        ? "justify-start"
                        : "justify-end"
                    }`}
                  >
                    <div
                      className={`max-w-sm p-3 rounded-xl ${
                        msg.sender === "assistant"
                          ? assistantBubbleClass
                          : userBubbleClass
                      }`}
                      style={{ whiteSpace: "pre-wrap" }}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div
                className={`p-4 rounded-b-lg border-t border-purple-800 flex space-x-2 ${inputContainerClass}`}
              >
                <input
                  type="text"
                  className={`flex-1 p-3 rounded-md focus:outline-none ${inputBoxClass}`}
                  placeholder="Type your message here..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  onClick={handleSend}
                  className={`px-4 py-2 rounded-md transition-colors ${sendButtonClass}`}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
