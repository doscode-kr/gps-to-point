import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface URLInputProps {
  onCoordinatesExtracted: (lat: string, lng: string) => void;
}

export const URLInput = ({ onCoordinatesExtracted }: URLInputProps) => {
  const [url, setUrl] = useState("");
  const { toast } = useToast();

  const extractCoordinates = () => {
    try {
      const regex = /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/;
      const match = url.match(regex);

      if (match) {
        const [, latitude, longitude] = match;
        onCoordinatesExtracted(latitude, longitude);
      } else {
        toast({
          title: "좌표를 찾을 수 없습니다",
          description: "올바른 구글 맵스 URL을 입력해주세요.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "오류 발생",
        description: "URL 처리 중 문제가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <Input
          placeholder="구글 맵스 URL을 붙여넣으세요"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full"
        />
      </div>
      <Button 
        onClick={extractCoordinates}
        className="w-full bg-google-blue hover:bg-google-blue/90"
      >
        좌표 추출하기
      </Button>
    </div>
  );
};