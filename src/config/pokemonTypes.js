// 포켓몬 타입별 아이콘, 색상 설정
// react-icons에서 아이콘을 import하여 매핑
import {
  FaFire,
  FaDroplet as FaWaterdrop,
  FaLeaf,
  FaBolt as FaBoltLightning,
  FaMountain,
  FaSnowflake as FaCloudSnow,
  FaHandFist,
  FaSkull,
  FaEye,
  FaBug,
  FaDragon,
  FaMoon,
  FaHammer,
  FaFeather,
  FaStar,
  FaGhost,
  FaCircleDot
} from "react-icons/fa6";

// 포켓몬 타입 설정 객체
export const POKEMON_TYPES = {
  fire: {
    icon: FaFire,
    color: "red.300",
    bgColor: "red.50",
    emoji: "🔥",
    displayName: "Fire"
  },
  water: {
    icon: FaWaterdrop,
    color: "blue.300", 
    bgColor: "blue.50",
    emoji: "💧",
    displayName: "Water"
  },
  grass: {
    icon: FaLeaf,
    color: "green.500",
    bgColor: "green.50", 
    emoji: "🍃",
    displayName: "Grass"
  },
  electric: {
    icon: FaBoltLightning,
    color: "yellow.500",
    bgColor: "yellow.50",
    emoji: "⚡", 
    displayName: "Electric"
  },
  ice: {
    icon: FaCloudSnow,
    color: "cyan.500",
    bgColor: "cyan.50",
    emogi: "❄️",
    displayName: "Ice"
  },
  fighting: {
    icon: FaHandFist,
    color: "orange.500",
    bgColor: "orange.50",
    emoji: "👊",
    displayName: "Fighting"
  },
  poison: {
    icon: FaSkull,
    color: "purple.500", 
    bgColor: "purple.50",
    emoji: "☠️",
    displayName: "Poison"
  },
  ground: {
    icon: FaMountain,
    color: "yellow.600",
    bgColor: "yellow.50",
    emoji: "🏔️",
    displayName: "Ground"
  },
  flying: {
    icon: FaFeather,
    color: "teal.500",
    bgColor: "teal.50", 
    emoji: "🪶",
    displayName: "Flying"
  },
  psychic: {
    icon: FaEye,
    color: "pink.500",
    bgColor: "pink.50",
    emoji: "👁️",
    displayName: "Psychic"
  },
  bug: {
    icon: FaBug,
    color: "lime.500",
    bgColor: "lime.50",
    emoji: "🐛", 
    displayName: "Bug"
  },
  rock: {
    icon: FaCircleDot,
    color: "yellow.700",
    bgColor: "yellow.50",
    emoji: "🪨",
    displayName: "Rock"
  },
  ghost: {
    icon: FaGhost,
    color: "purple.400",
    bgColor: "purple.50",
    emoji: "👻",
    displayName: "Ghost"
  },
  dragon: {
    icon: FaDragon,
    color: "indigo.500",
    bgColor: "indigo.50",
    emoji: "🐉",
    displayName: "Dragon"
  },
  dark: {
    icon: FaMoon,
    color: "gray.700",
    bgColor: "gray.50",
    emoji: "🌙",
    displayName: "Dark"
  },
  steel: {
    icon: FaHammer,
    color: "gray.500",
    bgColor: "gray.50", 
    emoji: "⚙️",
    displayName: "Steel"
  },
  fairy: {
    icon: FaStar,
    color: "pink.400",
    bgColor: "pink.50",
    emoji: "✨",
    displayName: "Fairy"
  },
  normal: {
    icon: FaStar,
    color: "gray.500",
    bgColor: "gray.50",
    emoji: "⭐",
    displayName: "Normal"
  }
};

// 타입 이름으로 설정을 가져오는 헬퍼 함수
export const getTypeConfig = (typeName) => {
  return POKEMON_TYPES[typeName] || POKEMON_TYPES.normal;
};

// 모든 타입 이름 배열 반환
export const getAllTypeNames = () => {
  return Object.keys(POKEMON_TYPES);
};
