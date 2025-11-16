import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import VideoPlayer from './components/VideoPlayer';
import VideoAbstracts from './components/VideoAbstracts';
import VideoThumbnails from './components/VideoThumbnails';
import VideoCategories from './components/VideoCategories';
import {
  VideoPresentation,
  VideoPlayerState,
  VideoAbstract,
  VideoCategory
} from './types';

const VideoPresentationsPage: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [playerState, setPlayerState] = useState<VideoPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 1200,
    volume: 1,
    isMuted: false,
    isFullscreen: false,
    isLoading: false,
    buffered: 0
  });

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) setCurrentLanguage(savedLanguage);
  }, []);

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
    localStorage.setItem('preferredLanguage', language);
  };

  const videosPresentations: VideoPresentation[] = [
    {
      id: 'innovation-tech',
      title: 'Sustainable Technology Innovation for Rural Communities',
      duration: 1200,
      thumbnail: "https://images.unsplash.com/photo-1682341847835-25cec717ed42",
      thumbnailAlt: 'African engineer working with solar panels and sustainable technology equipment in rural setting',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      topic: 'Technology Innovation & Sustainability',
      category: 'innovation',
      languages: ['en', 'sw', 'lg'],
      abstracts: {
        en: `This presentation explores innovative technological solutions designed specifically for rural African communities, focusing on sustainable energy systems and water purification technologies.\n\nThe research demonstrates how locally-sourced materials can be combined with modern engineering principles to create affordable, maintainable solutions that address critical infrastructure needs.\n\nKey findings include a 40% reduction in implementation costs and 60% improvement in long-term sustainability when community members are trained in maintenance and repair procedures.\n\nThe presentation covers three main innovation areas: solar-powered water purification systems, mobile communication networks using mesh topology, and agricultural monitoring systems using IoT sensors powered by renewable energy sources.`,
        sw: `Uwasilishaji huu unachunguza suluhisho za kiteknolojia za ubunifu zilizoundwa maalum kwa jamii za vijijini za Kiafrika, ukizingatia mifumo ya nishati endelevu na teknolojia za usafishaji maji.\n\nUtafiti unaonyesha jinsi vifaa vya ndani vinavyoweza kuunganishwa na kanuni za uhandisi wa kisasa kuunda suluhisho za bei nafuu na zinazoweza kudumishwa ambazo zinashughulikia mahitaji muhimu ya miundombinu.\n\nMatokeo muhimu ni pamoja na kupungua kwa asilimia 40 katika gharama za utekelezaji na kuboresha kwa asilimia 60 katika uendelevu wa muda mrefu wakati wanajamii wanapofunzwa taratibu za matengenezo na ukarabati.\n\nUwasilishaji unashughulikia maeneo matatu makuu ya ubunifu: mifumo ya usafishaji maji inayotumia nishati ya jua, mitandao ya mawasiliano ya simu za mkononi kwa kutumia topologia ya wavu, na mifumo ya ufuatiliaji wa kilimo kwa kutumia vipima-hali vya IoT vinavyoendeshwa na vyanzo vya nishati vinavyoweza kujitegemea.`,
        lg: `Okwanjula kuno kunoonyonnyola enkola z'obuyiiya ezakolebwa mu ngeri ey'enjawulo eri bitundu by'omu byalo bya Afrika, nga kisinziira ku nkola z'amasannyalaze ag'olubeerera n'obuyiiya bw'okulongoosa amazzi.\n\nOkunoonyereza kulaga engeri ebintu eby'omu kitundu gye bisobola okugatibwa n'amateeka g'obuyiiya bw'omulembe guno okukola enkola ezitali za bbeeyi, eziyinza okukuumibwa ezikola ku byetaago by'omusingi ebikulu.\n\nEbivudde mu kunoonyereza bikulu mulimu okukendeeza kwa 40% mu nsaasaanya z'okussa mu nkola n'okulongoosa kwa 60% mu lubeerera lw'ebiseera eby'ewala ng'abantu b'omu kitundu bafunye okutendekebwa mu nkola z'okuddaabiriza n'okuddaabiriza.\n\nOkwanjula kuno kuzingiramu ebitundu bisatu ebikulu eby'obuyiiya: enkola z'okulongoosa amazzi ezikozesa amasannyalaze g'enjuba, emitimbagano gy'empuliziganya egikozesa enkola ya mesh topology, n'enkola z'okulondoola ebyobulimi ezikozesa ebipima-mbeera bya IoT ebiddukanyizibwa amasannyalaze ag'olubeerera.`
      },
      uploadDate: new Date('2024-01-15'),
      views: 1247,
      isNew: true
    },
    {
      id: 'culture-preservation',
      title: 'Digital Preservation of Indigenous African Languages',
      duration: 1080,
      thumbnail: "https://images.unsplash.com/photo-1508578451826-e124470a99d2",
      thumbnailAlt: 'Elderly African storyteller sharing traditional stories with young people in village setting',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
      topic: 'Cultural Heritage & Language Preservation',
      category: 'culture',
      languages: ['en', 'sw', 'lg'],
      abstracts: {
        en: `This comprehensive study examines innovative approaches to preserving indigenous African languages through digital technology platforms and community-based documentation initiatives.\n\nThe research methodology involved collaboration with 15 different ethnic communities across East Africa, documenting oral traditions, linguistic patterns, and cultural narratives that risk being lost to modernization.\n\nKey achievements include the development of a mobile application that records, transcribes, and categorizes traditional stories, songs, and linguistic expressions in their original languages with English and Kiswahili translations.\n\nThe project has successfully documented over 500 hours of audio content, created digital dictionaries for 8 indigenous languages, and established community training programs that have engaged more than 200 local cultural ambassadors in the preservation process.`,
        sw: `Utafiti huu wa kina unachunguza mbinu za ubunifu za kuhifadhi lugha za asili za Kiafrika kupitia majukwaa ya teknolojia ya kidijitali na miradi ya uandishi ya kijamii.\n\nMbinu za utafiti zilihusisha ushirikiano na jamii 15 tofauti za kikabila katika Afrika Mashariki, kuandika mapokeo ya mdomo, mifumo ya kilugha, na hadithi za kitamaduni ambazo ziko hatarini ya kupotea kwa uongozi wa kisasa.\n\nMafanikio muhimu ni pamoja na ukuzaji wa programu ya simu ya mkononi ambayo inarekodi, kuandika, na kupanga hadithi za jadi, nyimbo, na maneno ya kilugha katika lugha zao za asili pamoja na tafsiri za Kiingereza na Kiswahili.\n\nMradi umefanikiwa kuandika zaidi ya masaa 500 ya maudhui ya sauti, kuunda kamusi za kidijitali kwa lugha 8 za asili, na kuanzisha mipango ya mafunzo ya kijamii ambayo imehusisha zaidi ya mabalozi 200 wa kitamaduni wa ndani katika mchakato wa uhifadhi.`,
        lg: `Okunoonyereza kuno okw'obujjuvu kunoonyonnyola enkola z'obuyiiya ez'okukuuma ennimi z'obuzaaliranwa bza Afrika nga tuyita mu nkola za tekinologiya ya dijito n'emirimu gy'okuwandiika egya mu bitundu.\n\nEnkola z'okunoonyereza zaali ziriko okukwatagana n'ebitundu 15 eby'enjawulo eby'amawanga mu Afrika y'Ebuvanjuba, okuwandiika obusembatya bw'omu kamwa, enkola z'ennimi, n'emboozi z'obuwangwa eziri mu katyabaga y'okubuula olw'okufuuka kw'omulembe guno.\n\nEbituukiriddwa ebikulu mulimu okukola pulogulaamu ya simu ey'engalo erekoda, ewandiika, n'okuteekawo mu bibiina emboozi z'edda, ennyimba, n'ebigambo by'ennimi mu nnimi zaabyo ez'obutonde wamu n'okukyusibwa mu Lungereza ne Kiswahili.\n\nPulojekiti efuuse obuwanguzi mu kuwandiika okusinga essaawa 500 ez'ebirimu by'amaloboozi, okukola amadiikishenale aga dijito ag'ennimi 8 ez'obuzaaliranwa, n'okuteekawo pulogulaamu z'okutendeka ez'omu bitundu ezikwataganyizza abatumibwa b'obuwangwa ab'omu kitundu abasinga 200 mu nkola y'okukuuma.`
      },
      uploadDate: new Date('2024-01-10'),
      views: 892,
      isNew: false
    },
    {
      id: 'society-challenges',
      title: 'Addressing Urban Migration Challenges in Modern Africa',
      duration: 1320,
      thumbnail: "https://images.unsplash.com/photo-1674386491555-5b92161e4d04",
      thumbnailAlt: 'Aerial view of modern African city showing contrast between urban development and informal settlements',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4',
      topic: 'Urban Development & Social Policy',
      category: 'society',
      languages: ['en', 'sw', 'lg'],
      abstracts: {
        en: `This presentation analyzes the complex socio-economic challenges arising from rapid urban migration in contemporary African cities, with particular focus on housing, employment, and social integration issues.\n\nThe study examines case studies from five major African urban centers: Lagos, Nairobi, Accra, Addis Ababa, and Kampala, analyzing migration patterns, infrastructure strain, and policy responses over the past decade.\n\nResearch findings reveal that while urban migration contributes significantly to economic growth, inadequate planning and resource allocation have created substantial challenges in housing affordability, job creation, and social service delivery.\n\nThe presentation proposes a comprehensive framework for sustainable urban development that includes affordable housing initiatives, skills-based employment programs, and community integration strategies that preserve cultural identity while promoting economic advancement.`,
        sw: `Uwasilishaji huu unachanganua changamoto ngumu za kijamii na kiuchumi zinazotokana na uhamiaji wa haraka wa mijini katika miji ya Kiafrika ya kisasa, hasa ukizingatia masuala ya makazi, ajira, na ujumuishaji wa kijamii.\n\nUtafiti unachunguza mifano ya kesi kutoka vituo vikuu vitano vya mijini ya Kiafrika: Lagos, Nairobi, Accra, Addis Ababa, na Kampala, ukichanganua mifumo ya uhamiaji, mkazo wa miundombinu, na majibu ya sera katika muongo uliopita.\n\nMatokeo ya utafiti yanaonyesha kuwa ingawa uhamiaji wa mijini unachangia kwa kiasi kikubwa katika ukuaji wa kiuchumi, mipango isiyotosha na ugawaji wa rasilimali umeunda changamoto kubwa katika upatikanaji wa makazi, uundaji wa kazi, na utoaji wa huduma za kijamii.\n\nUwasilishaji unapendekeza mfumo wa kina wa maendeleo endelevu ya mijini ambao unajumuisha miradi ya makazi ya bei nafuu, mipango ya ajira inayotegemea ujuzi, na mikakati ya ujumuishaji wa jamii ambayo inahifadhi utambulisho wa kitamaduni huku ikiendeleza maendeleo ya kiuchumi.`,
        lg: `Okwanjula kuno kunoonyonnyola ebizibu by'obwetaavu eby'abantu n'ebyenfuna ebiva mu kutambuza kw'amangu okudda mu bibuga mu bibuga bya Afrika ebya mulembe guno, nga kisinziira ku nsonga z'amaka, emirimu, n'okugatta kw'abantu mu kitundu.\n\nOkunoonyereza kunoonyonnyola ebyokulabirako okuva mu bitundu bitaano ebikulu eby'ebibuga bya Afrika: Lagos, Nairobi, Accra, Addis Ababa, ne Kampala, nga kunoonyonnyola enkola z'okutambuza, okunyigiriza kw'omusingi, n'okuddamu kwa politiki mu myaka ekkumi egiyise.\n\nEbivudde mu kunoonyereza biraga nti newaakubadde okutambuza kw'ebibuga kuwaayo nnyo mu kukula kw'ebyenfuna, enteekateeka etamala n'okugabana kwa byobugagga bitonde ebizibu binene mu kusobola okufuna amaka, okutonda emirimu, n'okuwa obuweereza bw'abantu.\n\nOkwanjula kuno kuwa ekiruubirirwa eky'obujjuvu eky'enkulaakulana y'ebibuga ey'olubeerera erimu emirimu gy'amaka ag'ebbeeyi etasoboka, pulogulaamu z'emirimu ezissinziira ku bukugu, n'enkola z'okugatta abantu mu kitundu ezikuuma obumanyirivu bw'obuwangwa nga zitumbula enkulaakulana y'ebyenfuna.`
      },
      uploadDate: new Date('2024-01-05'),
      views: 1156,
      isNew: false
    },
    {
      id: 'research-methodology',
      title: 'Participatory Research Methods in African Communities',
      duration: 960,
      thumbnail: "https://images.unsplash.com/photo-1508578451826-e124470a99d2",
      thumbnailAlt: 'African researchers conducting community interviews and data collection in rural village setting',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      topic: 'Research Methodology & Community Engagement',
      category: 'research',
      languages: ['en', 'sw', 'lg'],
      abstracts: {
        en: `This presentation explores innovative participatory research methodologies specifically adapted for African community contexts, emphasizing ethical engagement, cultural sensitivity, and collaborative knowledge creation.\n\nThe research demonstrates how traditional Western research paradigms can be enhanced through integration of indigenous knowledge systems, community-led inquiry processes, and culturally appropriate data collection methods.\n\nKey methodological innovations include the development of visual storytelling techniques, community mapping exercises, and oral history documentation that respects traditional knowledge transmission patterns while meeting academic research standards.\n\nThe presentation showcases successful implementation of these methods across 12 research projects in rural and urban African settings, demonstrating improved community participation rates, more culturally relevant findings, and enhanced sustainability of research outcomes.`,
        sw: `Uwasilishaji huu unachunguza mbinu za ubunifu za utafiti wa ushiriki zilizobadilishwa maalum kwa mazingira ya jamii za Kiafrika, ukisisitiza ushirikiano wa kimaadili, unyeti wa kitamaduni, na uundaji wa maarifa ya ushirikiano.\n\nUtafiti unaonyesha jinsi mifumo ya jadi ya utafiti wa Magharibi inavyoweza kuboresha kupitia ujumuishaji wa mifumo ya maarifa ya asili, michakato ya uchunguzi inayoongozwa na jamii, na mbinu za ukusanyaji data zinazofaa kitamaduni.\n\nUbunifu muhimu wa mbinu ni pamoja na ukuzaji wa mbinu za kusimuliza kwa picha, mazoezi ya ramani za jamii, na uandishi wa historia ya mdomo ambao unaheshimu mifumo ya jadi ya upokeaji maarifa huku ukikidhi viwango vya utafiti wa kitaaluma.\n\nUwasilishaji unaonyesha utekelezaji mzuri wa mbinu hizi katika miradi 12 ya utafiti katika mazingira ya vijijini na mijini ya Kiafrika, ukionyesha viwango vilivyoboresha vya ushiriki wa jamii, matokeo yanayofaa zaidi kitamaduni, na uendelevu ulioboreshwa wa matokeo ya utafiti.`,
        lg: `Okwanjula kuno kunoonyonnyola enkola z'obuyiiya ez'okunoonyereza ez'okwegattako ezakyusibwamu mu ngeri ey'enjawulo olw'embeera z'ebitundu bya Afrika, nga kisinziira ku kwegatta okw'empisa, okussaamu omwoyo obuwangwa, n'okukola amagezi ag'okwegattako.\n\nOkunoonyereza kulaga engeri enkola za bulijjo ez'okunoonyereza eza Bugwanjuba gye zisobola okulongoosebwa nga tuyita mu kwegatta enkola z'amagezi ag'obuzaaliranwa, enkola z'okubuuza ezikulembeddwa abantu b'omu kitundu, n'enkola z'okukungaanya ebikozesebwa ezisaanira obuwangwa.\n\nObuyiiya obukulu obw'enkola mulimu okukola enkola z'okusimula nga tukozesa ebifaananyi, okukola emmepu z'ebitundu, n'okuwandiika ebyafaayo by'edda ebissaamu ekitiibwa enkola z'edda ez'okupokerezaamu amagezi nga bikkiriza omutindo gw'okunoonyereza okw'ebyenjigiriza.\n\nOkwanjula kuno kulaga okuteekebwa mu nkola obw'obuwanguzi obw'enkola zino mu pulojekiti 12 ez'okunoonyereza mu mbeera z'ebyalo n'ebibuga bya Afrika, nga kulaga emiwendo gy'okwetaba kw'abantu b'omu kitundu egirongoose, ebivudde ebisinga okukwatagana n'obuwangwa, n'okulubeerera okulongoose okw'ebiva mu kunoonyereza.`
      },
      uploadDate: new Date('2023-12-28'),
      views: 743,
      isNew: false
    }];

  const filteredVideos =
    selectedCategory === 'all'
      ? videosPresentations
      : videosPresentations.filter((v) => v.category === selectedCategory);

  const currentVideo = filteredVideos[currentVideoIndex] || videosPresentations[0];

  // Update abstracts dynamically
  const videoAbstracts: VideoAbstract[] = [
    {
      language: 'English',
      languageCode: 'en',
      flag: '🇺🇸',
      content: currentVideo.abstracts.en
    },
    {
      language: 'Kiswahili',
      languageCode: 'sw',
      flag: '🇹🇿',
      content: currentVideo.abstracts.sw
    },
    {
      language: 'Luganda',
      languageCode: 'lg',
      flag: '🇺🇬',
      content: currentVideo.abstracts.lg
    }
  ];

  const videoCategories: VideoCategory[] = [
    { id: 'all', name: 'All Videos', icon: 'Grid3X3', count: videosPresentations.length },
    { id: 'innovation', name: 'Innovation', icon: 'Lightbulb', count: videosPresentations.filter(v => v.category === 'innovation').length },
    { id: 'culture', name: 'Culture', icon: 'Users', count: videosPresentations.filter(v => v.category === 'culture').length },
    { id: 'society', name: 'Society', icon: 'Globe', count: videosPresentations.filter(v => v.category === 'society').length },
    { id: 'research', name: 'Research', icon: 'Search', count: videosPresentations.filter(v => v.category === 'research').length },
  ];

  // Player handlers
  const handlePlay = () => setPlayerState(prev => ({ ...prev, isPlaying: true }));
  const handlePause = () => setPlayerState(prev => ({ ...prev, isPlaying: false }));
  const handleSeek = (time: number) => setPlayerState(prev => ({ ...prev, currentTime: time }));
  const handleVolumeChange = (volume: number) => setPlayerState(prev => ({ ...prev, volume, isMuted: false }));
  const handleMute = () => setPlayerState(prev => ({ ...prev, isMuted: !prev.isMuted }));
  const handleFullscreen = () => setPlayerState(prev => ({ ...prev, isFullscreen: !prev.isFullscreen }));

  const handleVideoSelect = (video: VideoPresentation) => {
    const index = filteredVideos.findIndex((v) => v.id === video.id);
    setCurrentVideoIndex(index);
    setPlayerState(prev => ({ ...prev, isPlaying: false, currentTime: 0, duration: video.duration }));
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentVideoIndex(0);
  };

  return (
    <div className="min-h-screen bg-background flex">
      

      <div className="flex-1 flex flex-col">
        

        <main className="pt-16 p-6 max-w-7xl mx-auto space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Video" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-heading font-bold text-foreground">Video Presentations</h1>
                <p className="text-muted-foreground font-caption">Academic presentations with multilingual abstracts</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Icon name="Download" size={16} className="mr-2" />
                Download All
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="Share2" size={16} className="mr-2" />
                Share Collection
              </Button>
            </div>
          </div>

          {/* Video Categories */}
          <VideoCategories
            categories={videoCategories}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />

          {/* Video Player & Thumbnails */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">
              <VideoPlayer
                video={currentVideo}
                playerState={playerState}
                onPlay={handlePlay}
                onPause={handlePause}
                onSeek={handleSeek}
                onVolumeChange={handleVolumeChange}
                onMute={handleMute}
                onFullscreen={handleFullscreen}
              />
              <VideoAbstracts
                abstracts={videoAbstracts}
                currentLanguage={currentLanguage}
                onLanguageChange={handleLanguageChange}
              />
            </div>

            <div className="xl:col-span-1">
              <VideoThumbnails
                videos={filteredVideos}
                currentVideo={currentVideo}
                onVideoSelect={handleVideoSelect}
              />
            </div>
          </div>

          {/* Additional Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Language Support Card */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Icon name="Globe" size={20} className="text-accent" />
                <h3 className="font-heading font-semibold text-foreground">Language Support</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3"><span className="text-lg">🇺🇸</span><span className="text-foreground">English</span></div>
                <div className="flex items-center space-x-3"><span className="text-lg">🇹🇿</span><span className="text-foreground">Kiswahili</span></div>
                <div className="flex items-center space-x-3"><span className="text-lg">🇺🇬</span><span className="text-foreground">Luganda</span></div>
              </div>
            </div>

            {/* Playback Options Card */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Icon name="Settings" size={20} className="text-success" />
                <h3 className="font-heading font-semibold text-foreground">Playback Options</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between"><span className="text-muted-foreground">Quality</span><span className="font-medium text-foreground">HD 720p</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Subtitles</span><span className="font-medium text-foreground">Available</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Download</span><span className="font-medium text-foreground">Enabled</span></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default VideoPresentationsPage;
