'use client';

import { useEffect, useRef } from 'react';

interface KakaoMapProps {
  address: string;
}

export default function KakaoMap({ address }: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const KAKAO_MAP_API_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;

  useEffect(() => {
    if (!KAKAO_MAP_API_KEY) {
      console.error('Kakao Map API key is missing!');
      return;
    }

    const loadMap = () => {
      if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
        console.error('Kakao Map library not loaded yet.');
        return;
      }

      const geocoder = new window.kakao.maps.services.Geocoder();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      geocoder.addressSearch(address, (result: any, status: string) => {
        if (status === window.kakao.maps.services.Status.OK && mapRef.current) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          const map = new window.kakao.maps.Map(mapRef.current, {
            center: coords,
            level: 3,
          });

          new window.kakao.maps.Marker({
            map,
            position: coords,
          });
        } else {
          console.error('주소 검색 실패:', address);
        }
      });
    };

    // 이미 로드된 경우 중복 로딩 방지
    const isScriptLoaded = document.querySelector(
      'script[src*="dapi.kakao.com"]',
    );
    if (isScriptLoaded) {
      loadMap(); // 이미 로드되었으면 바로 실행
      return;
    }

    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&autoload=false&libraries=services`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        loadMap();
      });
    };
  }, [address, KAKAO_MAP_API_KEY]);

  return <div ref={mapRef} className="h-[25rem] w-[31.25rem] rounded-md" />;
}
