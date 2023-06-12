import Image from "next/image";
import imageMainCar from "../../mainImageDetail.png";

export default function Home() {
  const images = [
    imageMainCar,
    imageMainCar,
    imageMainCar,
    imageMainCar,
    imageMainCar,
    imageMainCar,
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <p className="bg-brand-100">Kars project</p>
    </main>
  );
}
