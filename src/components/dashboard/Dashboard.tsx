import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';
import { FileUploader } from '../molecules/FileUploader';
import { MoleculeViewer } from '../molecules/MoleculeViewer';
import { AnalysisChart } from '../molecules/AnalysisChart';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('upload');
  const [smiles, setSMILES] = useState('');
  const [showMolecule, setShowMolecule] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); 
    const formData = new FormData(event.target as HTMLFormElement);
    const smilesData = formData.get('smiles') as string;

    console.log('SMILES Data:', smilesData);
    if (smilesData) {
      setSMILES(smilesData); 
      setShowMolecule(true);
    }
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    console.log('File uploaded:', file.name);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex space-x-2">
        {['upload', 'visualize', 'analyze'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg capitalize transition-colors ${
              activeTab === tab
                ? 'bg-primary text-primary-foreground'
                : 'bg-background hover:bg-primary/10'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glassmorphism p-6 flex justify-center flex-col"
      >
        {activeTab === 'upload' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Upload Molecular Data</h2>
            <FileUploader onFileUpload={handleFileUpload} />
          </div>
        )}

        {activeTab === 'visualize' && (
          <div className="space-y-4  w-full">
            <h2 className="text-xl font-semibold">3D Molecule Viewer</h2>
            <div className="h-[400px] w-full mt-4 flex flex-col align-middle justify-center">
            {showMolecule && (
              
                <div className='w-full flex justify-center'>
                  <MoleculeViewer smiles={smiles} />
                </div>
              
            )}
            </div>

            <form className="w-full space-y-4" onSubmit={handleSubmit}>
              <h2 className="text-lg font-semibold">Enter the SMILES of the compound</h2>
              <input
                name="smiles"
                className="w-full text-black focus:outline-none rounded-lg px-4 py-2"
                placeholder="Enter the SMILES of the compound"
              />
              <button
                className="bg-primary w-full px-4 py-2 rounded-lg text-primary-foreground transition-colors duration-200 hover:bg-primary/10"
                type="submit"
              >
                Submit
              </button>
            </form>

            
          </div>
        )}

        {activeTab === 'analyze' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glassmorphism p-4">
              <h3 className="text-lg font-semibold mb-4">Analysis Results</h3>
              <AnalysisChart />
            </div>
            <div className="glassmorphism p-4">
              <h3 className="text-lg font-semibold mb-4">AI Insights</h3>
              <ul className="space-y-2 text-sm">
                <li>• High binding affinity detected in molecular structure</li>
                <li>• Predicted LogP value: 2.45</li>
                <li>• Drug-likeness score: 0.85</li>
                <li>• Suggested optimization: Modify R-group at position 3</li>
              </ul>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
