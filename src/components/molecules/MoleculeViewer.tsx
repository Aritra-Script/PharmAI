<<<<<<< HEAD

import React, { useEffect, useRef, useState, createContext, useContext } from "react";
import * as $3Dmol from "3dmol";
import { ADMETModel } from "admet_ai";

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme as Theme) || 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
=======
import React, { useEffect, useRef, useState } from 'react';
import * as $3Dmol from '3dmol';
>>>>>>> origin/main

interface MoleculeViewerProps {
  smiles: string;
}

export const MoleculeViewer: React.FC<MoleculeViewerProps> = ({ smiles }) => {
  const viewerRef = useRef<HTMLDivElement>(null);
<<<<<<< HEAD
  const [CID, setCID] = useState<string | null>(null);
  const [iupacName, setIUPACName] = useState<string | null>(null);
  const [properties, setProperties] = useState<any>(null);
  const [synonyms, setSynonyms] = useState<string[]>([]);
  const [admetProps, setAdmetProps] = useState<any>(null);

  useEffect(() => {
    const fetchMoleculeData = async (smiles: string) => {
      try {
        const cidResponse = await fetch(
          `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/smiles/${encodeURIComponent(smiles)}/cids/JSON`
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
          setIUPACName(propertiesData.PropertyTable.Properties[0]?.IUPACName || "N/A");
        }

        const synonymsResponse = await fetch(
          `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/synonyms/JSON`
        );
        if (synonymsResponse.ok) {
          const synonymsData = await synonymsResponse.json();
          setSynonyms(synonymsData.InformationList?.Information[0]?.Synonym || []);
        }
      } catch (error) {
        console.error("Error fetching PubChem data:", error);
=======
  const [CID,setCID] = useState("");
  const [properties, setProperties] = useState<any>(null);

  useEffect(() => {
    const fetchCID = async(smiles:string)=>{
      const res = await fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/smiles/${encodeURIComponent(smiles)}/cids/JSON`);
      if(res.ok)
      {
        const json = await res.json();
        const cid = json.IdentifierList.CID[0];
        setCID(cid);
        console.log("cid:" ,cid);
      }
      else{
        console.error('Failed to fetch CID of the SMILE');
      }
    }

    const fetchProperties = async (CID: string) => {
      try{
        const response = await fetch(
          `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${encodeURIComponent(CID)}/property/MolecularFormula,MolecularWeight/JSON`
        );
        if (response.ok) {
          const data = await response.json();
          setProperties(data.PropertyTable.Properties[0]);
        } else {
          console.error('Failed to fetch chemical properties');
          setProperties(null);
        }
      }catch(e){
        console.log("error: ", e);
>>>>>>> origin/main
      }
    };

    const fetchSDF = async (smiles: string) => {
<<<<<<< HEAD
      try {
        const response = await fetch(
          `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/smiles/${encodeURIComponent(smiles)}/SDF`
        );
        return response.ok ? await response.text() : null;
      } catch (error) {
        console.error("Failed to fetch SDF:", error);
        return null;
      }
    };
  //  if (ThemeProvider==="dark"){
  //   var bgColor = "black";
  //  }///////////////////////////////////////////////////////////////////////////
    const renderMolecule = async () => {
      if (viewerRef.current && smiles) {
        const element = viewerRef.current;
        element.innerHTML = "";

        const sdfData = await fetchSDF(smiles);
        if (sdfData) {
          const viewer = $3Dmol.createViewer(element, { backgroundColor: "white" });
          viewer.addModel(sdfData, "sdf");
          viewer.setStyle({}, { stick: { radius: 0.15, colorscheme: "Jmol" }, sphere: { radius: 0.3 } });
          viewer.zoomTo();
          viewer.spin("y", 1);
=======
      const response = await fetch(
        `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/smiles/${encodeURIComponent(smiles)}/SDF`
      );
      if (response.ok) {
        return await response.text();
      } else {
        console.error('Failed to fetch SDF format');
        return null;
      }
    };

    const renderMolecule = async () => {
      if (viewerRef.current && smiles) {
        const element = viewerRef.current;
        element.innerHTML = ''; // Clear previous content

        const sdfData = await fetchSDF(smiles);
        if (sdfData) {
          const viewer = $3Dmol.createViewer(element, {
            backgroundColor: 'black',
          });

          const canvas = element.querySelector('canvas');
          if(canvas)
          {
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.borderRadius = '8px'; 
          }

          viewer.addModel(sdfData, 'sdf');
          viewer.setStyle({}, {
            stick: { radius: 0.15, colorscheme: 'Jmol' },
            sphere: { radius: 0.3 },
          });
          viewer.zoomTo();
          viewer.spin('y', 1);
>>>>>>> origin/main
          viewer.render();
        }
      }
    };

<<<<<<< HEAD
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
  }, [smiles]);

  return (
    <div className="flex flex-row gap-4 w-full h-[700px]">
      <div ref={viewerRef} className="w-1/2 h-[700px]" />
      <div className="w-1/2 flex flex-col gap-4">
        <div className="p-4 border rounded-lg w-full">
          <h3><b>Physical And Chemical Properties</b></h3>
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
          <h3><b>ADMET Properties (Predicted)</b></h3>
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
=======
    renderMolecule();
    fetchCID(smiles);
    fetchProperties(CID);
  }, [smiles]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
      <div ref={viewerRef} style={{ height: '400px', width: '70%' , minWidth: '300px', position:'relative', flexWrap:'wrap' }} />
      <div style={{ width: '40%', height:'100%', color: 'white', display:'flex', flexDirection:'column' ,}}>
        <h3 style={{fontSize:'32px'}}>Chemical Properties</h3>
        {properties ? (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td><strong>Molecular Formula</strong></td>
                <td>{properties.MolecularFormula}</td>
              </tr>
              <tr>
                <td><strong>Molecular Weight</strong></td>
                <td>{properties.MolecularWeight} g/mol</td>
              </tr>
              <tr>
                <td><strong>Boiling Point</strong></td>
                <td>{properties.BoilingPoint || 'N/A'} °C</td>
              </tr>
              <tr>
                <td><strong>Melting Point</strong></td>
                <td>{properties.MeltingPoint || 'N/A'} °C</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p>Loading properties...</p>
        )}
>>>>>>> origin/main
      </div>
    </div>
  );
};
