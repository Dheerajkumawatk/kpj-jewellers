import stud from "@/assets/p-stud.jpg";
import drop from "@/assets/p-drop.jpg";
import necklace from "@/assets/p-necklace.jpg";
import set from "@/assets/p-set.jpg";
import bracelet from "@/assets/p-bracelet.jpg";
import ring from "@/assets/p-ring.jpg";
import pink from "@/assets/p-pink.jpg";
import black from "@/assets/p-black.jpg";
import golden from "@/assets/p-golden.jpg";
import choker from "@/assets/p-choker.jpg";
import chand from "@/assets/p-chand.jpg";

export type Product = {
  id: string;
  name: string;
  category: string;
  color: string;
  price: number;
  originalPrice: number;
  image: string;
  bestseller?: boolean;
};

export const products: Product[] = [
  { id: "1", name: "Aaradhya Pearl Studs", category: "Stud Earrings", color: "White", price: 1299, originalPrice: 1899, image: stud, bestseller: true },
  { id: "2", name: "Meera Drop Earrings", category: "Drop Earrings", color: "Peach", price: 2499, originalPrice: 3499, image: drop, bestseller: true },
  { id: "3", name: "Saanvi Pearl Strand", category: "Necklaces", color: "White", price: 4999, originalPrice: 6999, image: necklace, bestseller: true },
  { id: "4", name: "Riya Bridal Set", category: "Gift Sets", color: "Golden", price: 5999, originalPrice: 8499, image: set, bestseller: true },
  { id: "5", name: "Anaya Pearl Bracelet", category: "Bracelets", color: "Peach", price: 1799, originalPrice: 2499, image: bracelet },
  { id: "6", name: "Ishani Solitaire Ring", category: "Rings", color: "White", price: 999, originalPrice: 1499, image: ring, bestseller: true },
  { id: "7", name: "Mehak Rose Necklace", category: "Necklaces", color: "Pink", price: 3499, originalPrice: 4999, image: pink },
  { id: "8", name: "Kaira Tahitian Drops", category: "Drop Earrings", color: "Black", price: 4299, originalPrice: 5999, image: black, bestseller: true },
  { id: "9", name: "Diya Golden Pendant", category: "Necklaces", color: "Golden", price: 2999, originalPrice: 3999, image: golden },
  { id: "10", name: "Vidya Multi-Strand Choker", category: "Necklaces", color: "White", price: 5499, originalPrice: 7499, image: choker, bestseller: true },
  { id: "11", name: "Aditi Chandelier Earrings", category: "Drop Earrings", color: "Peach", price: 3299, originalPrice: 4499, image: chand },
  { id: "12", name: "Naina Classic Studs", category: "Stud Earrings", color: "Grey", price: 1099, originalPrice: 1599, image: stud },
];

export const categories = [
  { name: "Stud Earrings", image: stud },
  { name: "Drop Earrings", image: drop },
  { name: "Necklaces", image: necklace },
  { name: "Gift Sets", image: set },
  { name: "Bracelets", image: bracelet },
  { name: "Rings", image: ring },
];

export const collections = [
  { name: "Bridal Edit", desc: "For your most cherished day", image: set },
  { name: "Everyday Elegance", desc: "Timeless pieces for daily grace", image: stud },
  { name: "Statement Heirlooms", desc: "Bold designs to be treasured", image: choker },
];

export const colorSwatches = [
  { name: "White", hex: "#F5F0E6" },
  { name: "Pink", hex: "#F4C2C2" },
  { name: "Peach", hex: "#FFCBA4" },
  { name: "Grey", hex: "#A9A9A9" },
  { name: "Black", hex: "#2C2C2C" },
  { name: "Brown", hex: "#8B6F47" },
  { name: "Golden", hex: "#D4A857" },
];
