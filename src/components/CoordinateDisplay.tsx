import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface CoordinateDisplayProps {
  latitude: string;
  longitude: string;
  placeName?: string;
}

export const CoordinateDisplay = ({ latitude, longitude, placeName }: CoordinateDisplayProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const pointFormat = `POINT (${latitude} ${longitude})`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pointFormat);
      setCopied(true);
      toast({
        title: "복사 완료!",
        description: "클립보드에 복사되었습니다.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "복사 실패",
        description: "클립보드 접근에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-google-blue">변환된 좌표</h2>
      <div className="space-y-2">
        {placeName && (
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
            <span className="text-gray-600">장소:</span>
            <span className="font-mono">{decodeURIComponent(placeName)}</span>
          </div>
        )}
        <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
          <span className="text-gray-600">위도:</span>
          <span className="font-mono">{latitude}</span>
        </div>
        <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
          <span className="text-gray-600">경도:</span>
          <span className="font-mono">{longitude}</span>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
            <span className="font-mono">{pointFormat}</span>
            <Button
              onClick={handleCopy}
              variant="outline"
              size="sm"
              className={`ml-2 ${copied ? 'animate-copy-success' : ''}`}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};