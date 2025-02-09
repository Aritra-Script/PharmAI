// import React, {
//   useEffect,
//   useRef,
//   useState,
//   createContext,
//   useContext,
// } from "react";
// import * as $3Dmol from "3dmol";
// import { useTheme } from "../../contexts/ThemeContext"; // Adjust the import path

// const SmilesContext = createContext<{ smiles: string | null }>({
//   smiles: null,
// });

// export const useSmiles = () => useContext(SmilesContext);

// interface MoleculeViewerProps {
//   smiles: string;
// }

// export const MoleculeViewer: React.FC<MoleculeViewerProps> = ({ smiles }) => {
//   const viewerRef = useRef<HTMLDivElement>(null);
//   const { theme } = useTheme(); // Get current theme
//   const [CID, setCID] = useState<string | null>(null);
//   const [iupacName, setIUPACName] = useState<string | null>(null);
//   const [properties, setProperties] = useState<any>(null);
//   const [synonyms, setSynonyms] = useState<string[]>([]);
//   const [admetProps, setAdmetProps] = useState<any>(null);

//   useEffect(() => {
//     const fetchMoleculeData = async (smiles: string) => {
//       try {
//         const cidResponse = await fetch(
//           `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/smiles/${encodeURIComponent(
//             smiles
//           )}/cids/JSON`
//         );

//         if (!cidResponse.ok) throw new Error(`Failed to fetch CID`);
//         const cidData = await cidResponse.json();
//         const cid = cidData.IdentifierList?.CID?.[0];
//         if (!cid) throw new Error("No CID found for this SMILES string.");
//         setCID(cid);

//         const propertiesResponse = await fetch(
//           `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/property/IUPACName,MolecularFormula,MolecularWeight,XLogP/JSON`
//         );
//         if (propertiesResponse.ok) {
//           const propertiesData = await propertiesResponse.json();
//           setProperties(propertiesData.PropertyTable.Properties[0]);
//           setIUPACName(
//             propertiesData.PropertyTable.Properties[0]?.IUPACName || "N/A"
//           );
//         }

//         const synonymsResponse = await fetch(
//           `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/synonyms/JSON`
//         );
//         if (synonymsResponse.ok) {
//           const synonymsData = await synonymsResponse.json();
//           setSynonyms(
//             synonymsData.InformationList?.Information[0]?.Synonym || []
//           );
//         }
//       } catch (error) {
//         console.error("Error fetching PubChem data:", error);
//       }
//     };

//     const fetchSDF = async (smiles: string) => {
//       try {
//         const response = await fetch(
//           `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/smiles/${encodeURIComponent(
//             smiles
//           )}/SDF`
//         );
//         return response.ok ? await response.text() : null;
//       } catch (error) {
//         console.error("Failed to fetch SDF:", error);
//         return null;
//       }
//     };

//     const renderMolecule = async () => {
//       if (viewerRef.current && smiles) {
//         const element = viewerRef.current;
//         element.innerHTML = "";

//         const sdfData = await fetchSDF(smiles);
//         if (sdfData) {
//           const viewer = $3Dmol.createViewer(element, {
//             backgroundColor: theme === "dark" ? "black" : "white", // Theme-based background
//           });
//           viewer.addModel(sdfData, "sdf");
//           viewer.setStyle(
//             {},
//             {
//               stick: { radius: 0.15, colorscheme: "Jmol" },
//               sphere: { radius: 0.3 },
//             }
//           );
//           viewer.zoomTo();
//           viewer.spin("y", 1);
//           viewer.render();
//         }
//       }
//     };

//     const predictAdmet = async () => {
//       try {
//         const response = await fetch("http://localhost:8000/predict_admet/", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ smiles }),
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setAdmetProps(data.admet_properties);
//         } else {
//           console.error("Failed to fetch ADMET properties");
//         }
//       } catch (error) {
//         console.error("Error predicting ADMET properties:", error);
//       }
//     };

//     fetchMoleculeData(smiles);
//     renderMolecule();
//     predictAdmet();
//   }, [smiles, theme]); // Re-run when theme changes

//   return (
//     <div className="flex flex-row gap-4 w-full h-[700px]">
//       <div ref={viewerRef} className="w-1/2 h-[700px]" />
//       <div className="w-1/2 flex flex-col gap-4">
//         <div className="p-4 border rounded-lg w-full">
//           <h3>
//             <b>Physical And Chemical Properties</b>
//           </h3>
//           {properties && (
//             <table>
//               <tbody>
//                 {Object.entries(properties).map(([key, value]) => (
//                   <tr key={key}>
//                     <td>{key}</td>
//                     <td>{String(value)}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//         <div className="p-4 border rounded-lg overflow-auto w-full h-[700px]">
//           <h3>
//             <b>ADMET Properties (Predicted)</b>
//           </h3>
//           {admetProps && (
//             <table>
//               <tbody>
//                 {Object.entries(admetProps).map(([key, value]) => (
//                   <tr key={key}>
//                     <td>{key}</td>
//                     <td>{String(value)}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import * as $3Dmol from "3dmol";
import { useTheme } from "../../contexts/ThemeContext"; // Adjust the import path

const SmilesContext = createContext<{ smiles: string | null }>({
  smiles: null,
});

export const useSmiles = () => useContext(SmilesContext);

interface MoleculeViewerProps {
  smiles: string;
}

export const MoleculeViewer: React.FC<MoleculeViewerProps> = ({ smiles }) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme(); // Get current theme
  const [CID, setCID] = useState<string | null>(null);
  const [iupacName, setIUPACName] = useState<string | null>(null);
  const [properties, setProperties] = useState<any>(null);
  const [synonyms, setSynonyms] = useState<string[]>([]);
  const [admetProps, setAdmetProps] = useState<any>(null);

  useEffect(() => {
    const fetchMoleculeData = async (smiles: string) => {
      try {
        const cidResponse = await fetch(
          `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/smiles/${encodeURIComponent(
            smiles
          )}/cids/JSON`
        );

        if (!cidResponse.ok) throw new Error(`Failed to fetch CID`);
        const cidData = await cidResponse.json();
        const cid = cidData.IdentifierList?.CID?.[0];
        if (!cid) throw new Error("No CID found for this SMILES string.");
        setCID(cid);

        const propertiesResponse = await fetch(
          `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/property/IUPACName,MolecularFormula,MolecularWeight,XLogP/JSON`
        );
        if (propertiesResponse.ok) {
          const propertiesData = await propertiesResponse.json();
          setProperties(propertiesData.PropertyTable.Properties[0]);
          setIUPACName(
            propertiesData.PropertyTable.Properties[0]?.IUPACName || "N/A"
          );
        }

        const synonymsResponse = await fetch(
          `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/synonyms/JSON`
        );
        if (synonymsResponse.ok) {
          const synonymsData = await synonymsResponse.json();
          setSynonyms(
            synonymsData.InformationList?.Information[0]?.Synonym || []
          );
        }
      } catch (error) {
        console.error("Error fetching PubChem data:", error);
      }
    };

    const fetchSDF = async (smiles: string) => {
      try {
        const response = await fetch(
          `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/smiles/${encodeURIComponent(
            smiles
          )}/SDF`
        );
        return response.ok ? await response.text() : null;
      } catch (error) {
        console.error("Failed to fetch SDF:", error);
        return null;
      }
    };

    const renderMolecule = async () => {
      if (viewerRef.current && smiles) {
        const element = viewerRef.current;
        element.innerHTML = "";

        const sdfData = await fetchSDF(smiles);
        if (sdfData) {
          const viewer = $3Dmol.createViewer(element, {
            backgroundColor: theme === "dark" ? "black" : "white", // Theme-based background
          });
          viewer.addModel(sdfData, "sdf");
          viewer.setStyle(
            {},
            {
              stick: { radius: 0.15, colorscheme: "Jmol" },
              sphere: { radius: 0.3 },
            }
          );
          viewer.zoomTo();
          viewer.spin("y", 1);
          viewer.render();
        }
      }
    };

    const predictAdmet = async () => {
      try {
        const response = await fetch("http://localhost:8000/predict_admet/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ smiles }),
        });

        if (response.ok) {
          const data = await response.json();
          setAdmetProps(data.admet_properties);
        } else {
          console.error("Failed to fetch ADMET properties");
        }
      } catch (error) {
        console.error("Error predicting ADMET properties:", error);
      }
    };

    fetchMoleculeData(smiles);
    renderMolecule();
    predictAdmet();
  }, [smiles, theme]); // Re-run when theme changes

  return (
    <div className="flex flex-row gap-4 w-full h-[700px] p-4"> 
      <div ref={viewerRef} className="w-1/2 h-[700px] rounded-2xl p-4 border shadow-lg relative" />
      <div className="w-1/2 flex flex-col gap-4">
        <div className="p-4 border rounded-lg w-full">
          <h3>
            <b>Physical And Chemical Properties</b>
          </h3>
          {properties && (
            <table>
              <tbody>
                {Object.entries(properties).map(([key, value]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{String(value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="p-4 border rounded-lg overflow-auto w-full h-[700px]">
          <h3>
            <b>ADMET Properties (Predicted)</b>
          </h3>
          {admetProps && (
            <table>
              <tbody>
                {Object.entries(admetProps).map(([key, value]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{String(value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
