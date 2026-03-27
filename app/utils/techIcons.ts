import { 
  // Frontend
  SiReact, SiVuedotjs, SiJquery,
  // Languages
  SiOpenjdk, SiJavascript, SiTypescript, SiPython, SiC, SiRuby, SiPhp,
  // Backend
  SiNextdotjs, SiNodedotjs, SiFlask, SiSpring, SiSpringboot,
  // CSS
  SiTailwindcss, SiFramer,
  // Databases
  SiMongodb, SiMysql, SiPostgresql, SiClickhouse, SiPrisma,
  // Cloud/DevOps
  SiAmazon, SiVercel, SiApachekafka,
  // Build Tools
  SiGradle, SiVite
} from 'react-icons/si';
import { RiOpenaiFill, RiSupabaseFill } from "react-icons/ri";

// 기본 아이콘들 (Simple Icons에 없는 기술들 대용)
import { FaCode, FaDatabase, FaTools, FaCog, FaMicrochip } from 'react-icons/fa';

export type IconComponent = React.ComponentType<{ className?: string }>;

export const techIconMap: Record<string, IconComponent> = {
  // Frontend Frameworks
  'React': SiReact,
  'Vue.js': SiVuedotjs,
  'Next.js': SiNextdotjs,
  'jQuery': SiJquery,
  
  // Languages
  'Java': SiOpenjdk,
  'JavaScript': SiJavascript,
  'TypeScript': SiTypescript,
  'Python': SiPython,
  'C': SiC,
  'Ruby': SiRuby,
  'PHP': SiPhp,
  
  // Backend Frameworks
  'Node.js': SiNodedotjs,
  'Flask': SiFlask,
  'Spring': SiSpring,
  'Springboot': SiSpringboot,
  
  // CSS
  'TailwindCSS': SiTailwindcss,
  'Framer': SiFramer,
  
  // Databases
  'MongoDB': SiMongodb,
  'MySQL': SiMysql,
  'PostgreSQL': SiPostgresql,
  'ClickHouse': SiClickhouse,
  'Prisma': SiPrisma,
  'Supabase': RiSupabaseFill,
  
  // AI
  'OpenAI': RiOpenaiFill,

  // Cloud & DevOps
  'AWS EC2': SiAmazon,
  'Vercel': SiVercel,
  'Kafka': SiApachekafka,
  
  // Build Tools & State Management
  'Gradle': SiGradle,
  'Vite': SiVite,
  'Zustand': FaDatabase,
  
  // Development Tool
  'GDB': FaTools,
  'QEMU': FaCog,
  'Makefile': FaTools,
  'Jinja': FaCode,
  'STM32F': FaMicrochip,
  'Embedded C': FaMicrochip,
};

export const getTechIcon = (techName: string): IconComponent | null => {
  return techIconMap[techName] || null;
};

export const availableTechStacks = Object.keys(techIconMap);