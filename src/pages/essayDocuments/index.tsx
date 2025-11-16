import React, { useState, useEffect } from "react";
import {
  EssayDocument,
  Bookmark,
  SearchResult,
  ViewerSettings,
  ReadingProgress,
} from "./Types/index";
import EssayViewer from "./Components/EssayViewer";
import ReadingControls from "./Components/ReadingControl";
import BookmarkPanel from "./Components/BookMarkPanel";
import SearchPanel from "./Components/SearchPanel";
import Button from "../../components/ui/Button";
import Icon from "../../components/AppIcon";

const EssayDocumentViewer = () => {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [currentPage, setCurrentPage] = useState(1);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [viewerSettings, setViewerSettings] = useState<ViewerSettings>({
    zoomLevel: 1,
    viewMode: "single",
    theme: "light",
    fontSize: "medium",
    showOutline: false,
    showBookmarks: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem("selectedLanguage") || "en";
    setCurrentLanguage(saved);
  }, []);

  const essayDocument: EssayDocument = {
    id: "autobiographical-essay-2024",
    title: "My Academic Journey: A Reflection on Growth and Discovery",
    subtitle: "An Autobiographical Essay for Capstone Project",
    author: "Amara Ochieng",
    language: currentLanguage as "en" | "sw" | "indigenous",
    pageCount: 28,
    fileSize: "2.4 MB",
    lastModified: new Date("2024-01-15"),
    pdfUrl: "/assets/documents/autobiographical-essay.pdf",
    thumbnailUrl: "/assets/images/essay-thumbnail.png",
    description:
      "A comprehensive autobiographical essay exploring my academic journey, personal growth, cultural identity, and professional aspirations throughout my university experience.",
    chapters: [
      { id: "introduction", title: "Introduction: The Beginning of My Journey", pageNumber: 1, level: 1 },
      { id: "early-education", title: "Early Educational Foundations", pageNumber: 3, level: 1 },
      { id: "university-journey", title: "University Experience and Growth", pageNumber: 9, level: 1 },
      { id: "cultural-identity", title: "Cultural Identity and Heritage", pageNumber: 19, level: 1 },
      { id: "future-aspirations", title: "Future Aspirations and Goals", pageNumber: 25, level: 1 },
      { id: "conclusion", title: "Conclusion: Lessons Learned and Moving Forward", pageNumber: 27, level: 1 },
    ],
    tags: ["autobiography", "academic journey", "personal growth"],
    readingTime: 45,
  };

  const readingProgress: ReadingProgress = {
    currentPage,
    totalPages: essayDocument.pageCount,
    percentage: (currentPage / essayDocument.pageCount) * 100,
    timeSpent: 0,
    bookmarks,
  };

  // Handlers
  const handleViewerSettingsChange = (partial: Partial<ViewerSettings>) => {
    setViewerSettings((prev) => ({ ...prev, ...partial }));
  };

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleBookmarkAdd = (bookmark: Bookmark) => setBookmarks((prev) => [...prev, bookmark]);
  const handleBookmarkClick = (pageNumber: number) => setCurrentPage(pageNumber);
  const handleBookmarkDelete = (id: string) => setBookmarks((prev) => prev.filter((b) => b.id !== id));
  const handleBookmarkEdit = (updated: Bookmark) =>
    setBookmarks((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));

  const handleSearch = (query: string) => {
    setIsSearching(true);
    setSearchQuery(query);
    setTimeout(() => {
      const results: SearchResult[] = [
        { pageNumber: 5, text: `academic journey with ${query}`, context: `Context about ${query}`, highlightIndex: 0 },
        { pageNumber: 12, text: `innovation and ${query}`, context: `Context about ${query}`, highlightIndex: 1 },
      ];
      setSearchResults(results);
      setIsSearching(false);
    }, 500);
  };

  const handleSearchResultClick = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = essayDocument.pdfUrl;
    link.download = `${essayDocument.title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Main Grid: PDF Viewer + Bookmark Panel */}
      <div className="flex-1 overflow-y-auto p-6 max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* PDF Viewer + Details */}
        <div className="xl:col-span-3 flex flex-col space-y-6">
          <EssayViewer
            document={essayDocument}
            onPageChange={handlePageChange}
            onBookmarkAdd={handleBookmarkAdd}
            onDownload={handleDownload}
          />

          <div className="bg-card border border-border rounded-lg p-4 space-y-2 mt-4">
            <h3 className="text-sm font-medium text-foreground mb-3">Essay Details</h3>
            <p className="text-xs text-muted-foreground"><strong>Author:</strong> {essayDocument.author}</p>
            <p className="text-xs text-muted-foreground"><strong>Pages:</strong> {essayDocument.pageCount}</p>
            <p className="text-xs text-muted-foreground"><strong>Size:</strong> {essayDocument.fileSize}</p>
            <p className="text-xs text-muted-foreground"><strong>Reading Time:</strong> {essayDocument.readingTime} min</p>
            <Button variant="ghost" size="sm" onClick={handleDownload} className="mt-3 w-full">
              <Icon name="Download" size={16} className="mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Bookmark Panel alongside PDF */}
        <div className="xl:col-span-1">
          <BookmarkPanel
            bookmarks={bookmarks}
            onBookmarkClick={handleBookmarkClick}
            onBookmarkDelete={handleBookmarkDelete}
            onBookmarkEdit={handleBookmarkEdit}
            isVisible={bookmarks.length > 0}
            onToggle={() => {}}
            className="sticky top-0"
          />
        </div>
      </div>

      {/* Fixed Bottom Controls */}
      <div className="fixed bottom-0 left-0 w-full z-20 bg-background border-t border-border p-3">
        <ReadingControls
          progress={readingProgress}
          settings={viewerSettings}
          onSettingsChange={handleViewerSettingsChange}
          onSearch={handleSearch}
          onBookmarkToggle={() => {}}
          onFullscreen={() => console.log("Fullscreen")}
          onDownload={handleDownload}
          onPrint={() => console.log("Print")}
        />
      </div>

      {/* Search Panel Overlay */}
      <SearchPanel
        searchResults={searchResults}
        currentQuery={searchQuery}
        isSearching={isSearching}
        onSearch={handleSearch}
        onResultClick={handleSearchResultClick}
        onClose={() => setSearchResults([])}
        isVisible={isSearching || searchResults.length > 0}
      />
    </div>
  );
};

export default EssayDocumentViewer;
