export interface NavbarProps {
  showSearch?: boolean;
  searchText?: string;
  onSearchTextChange?: (v: string) => void;
  locationText?: string;
  onLocationTextChange?: (v: string) => void;
}

export interface Service {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  image?: string;
  type?: string;
}


