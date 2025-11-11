import React, { useState } from 'react';
import { ResumeDocument } from '../types';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

interface DownloadActionsProps {
  documents: ResumeDocument[];
  activeDocument: ResumeDocument;
  className?: string;
}

const DownloadActions = ({ documents, activeDocument, className = '' }: DownloadActionsProps) => {
  const [downloadingIds, setDownloadingIds] = useState<string[]>([]);

  const handleDownload = async (document: ResumeDocument) => {
    setDownloadingIds(prev => [...prev, document.id]);
    
    // Simulate download process
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a mock download
      const link = document.createElement('a');
      link.href = document.downloadUrl;
      link.download = `${document.title}_${document.language}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setDownloadingIds(prev => prev.filter(id => id !== document.id));
    }
  };

  const handleDownloadAll = async () => {
    for (const doc of documents) {
      await handleDownload(doc);
      // Small delay between downloads
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  const isDownloading = (documentId: string) => downloadingIds.includes(documentId);

  return (
    <div className={`bg-card border border-border rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Download Resume
          </h3>
          <p className="text-sm text-muted-foreground font-caption">
            Available in multiple languages
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownloadAll}
          disabled={downloadingIds.length > 0}
        >
          <Icon name="Download" size={16} className="mr-2" />
          Download All
        </Button>
      </div>

      {/* Individual Language Downloads */}
      <div className="space-y-3">
        {documents.map((document) => (
          <div
            key={document.id}
            className={`
              flex items-center justify-between p-3 rounded-lg border transition-academic
              ${document.id === activeDocument.id 
                ? 'border-primary/20 bg-primary/5' :'border-border bg-muted/30'
              }
            `}
          >
            <div className="flex items-center space-x-3">
              <div className={`
                w-10 h-10 rounded-lg flex items-center justify-center
                ${document.id === activeDocument.id 
                  ? 'bg-primary/10' :'bg-muted'
                }
              `}>
                <Icon 
                  name="FileText" 
                  size={20} 
                  className={document.id === activeDocument.id ? 'text-primary' : 'text-muted-foreground'}
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-medium text-foreground">
                    {document.title}
                  </h4>
                  {document.id === activeDocument.id && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                      Current
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                  <span>{document.fileSize}</span>
                  <span>•</span>
                  <span>{document.totalPages} pages</span>
                  <span>•</span>
                  <span>Updated {document.lastModified.toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <Button
              variant={document.id === activeDocument.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleDownload(document)}
              disabled={isDownloading(document.id)}
              loading={isDownloading(document.id)}
            >
              {isDownloading(document.id) ? (
                <>
                  <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                  Downloading...
                </>
              ) : (
                <>
                  <Icon name="Download" size={16} className="mr-2" />
                  Download
                </>
              )}
            </Button>
          </div>
        ))}
      </div>

      {/* Additional Actions */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button variant="ghost" size="sm" className="justify-start">
            <Icon name="Printer" size={16} className="mr-2" />
            Print Current
          </Button>
          <Button variant="ghost" size="sm" className="justify-start">
            <Icon name="Share2" size={16} className="mr-2" />
            Share Link
          </Button>
          <Button variant="ghost" size="sm" className="justify-start">
            <Icon name="Mail" size={16} className="mr-2" />
            Email Resume
          </Button>
          <Button variant="ghost" size="sm" className="justify-start">
            <Icon name="ExternalLink" size={16} className="mr-2" />
            View Online
          </Button>
        </div>
      </div>

      {/* File Information */}
      <div className="mt-4 pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-2">File Information</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Format:</span>
            <span className="ml-2 text-foreground">PDF</span>
          </div>
          <div>
            <span className="text-muted-foreground">Version:</span>
            <span className="ml-2 text-foreground">2024.1</span>
          </div>
          <div>
            <span className="text-muted-foreground">Languages:</span>
            <span className="ml-2 text-foreground">{documents.length}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Total Size:</span>
            <span className="ml-2 text-foreground">
              {documents.reduce((total, doc) => total + parseFloat(doc.fileSize), 0).toFixed(1)} MB
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadActions;