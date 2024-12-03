import { useState } from "react";
import { URLInput } from "@/components/URLInput";
import { CoordinateDisplay } from "@/components/CoordinateDisplay";

const Index = () => {
  const [coordinates, setCoordinates] = useState<{
    latitude: string;
    longitude: string;
  } | null>(null);

  const handleCoordinatesExtracted = (lat: string, lng: string) => {
    setCoordinates({ latitude: lat, longitude: lng });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <div className="container max-w-2xl mx-auto py-12 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            구글 맵스 URL → GPS 좌표 변환기
          </h1>
          <p className="text-gray-600">
            구글 맵스 URL을 붙여넣으면 GPS 좌표로 변환해드립니다
          </p>
        </div>

        <div className="space-y-8">
          <URLInput onCoordinatesExtracted={handleCoordinatesExtracted} />
          
          {coordinates && (
            <CoordinateDisplay
              latitude={coordinates.latitude}
              longitude={coordinates.longitude}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;