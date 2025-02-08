import React, { useEffect, useRef } from 'react';
import * as $3Dmol from '3dmol';

interface MoleculeViewerProps {
  smiles: string;
}

export const MoleculeViewer: React.FC<MoleculeViewerProps> = ({ smiles }) => {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSDF = async (smiles: string) => {
      const response = await fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/smiles/${encodeURIComponent(smiles)}/SDF`);
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

          viewer.addModel(sdfData, 'sdf');
          viewer.setStyle({}, { stick: { radius: 0.2 } });
          viewer.zoomTo();
          viewer.render();
        }
      }
    };

    renderMolecule();
  }, [smiles]);

  return <div ref={viewerRef} style={{ height: '400px', width: '100%' }} />;
};
