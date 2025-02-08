import React, { useEffect, useRef, useState } from 'react';
import * as $3Dmol from '3dmol';

interface MoleculeViewerProps {
  smiles: string;
}

export const MoleculeViewer: React.FC<MoleculeViewerProps> = ({ smiles }) => {
  const viewerRef = useRef<HTMLDivElement>(null);
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
      }
    };

    const fetchSDF = async (smiles: string) => {
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
          viewer.render();
        }
      }
    };

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
      </div>
    </div>
  );
};
