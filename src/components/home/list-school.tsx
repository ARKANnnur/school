'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export interface SchoolData {
  kode_prop: string;
  propinsi: string;
  kode_kab_kota: string;
  kabupaten_kota: string;
  kode_kec: string;
  kecamatan: string;
  id: string;
  npsn: string;
  sekolah: string;
  bentuk: string;
  status: 'S' | 'N';
  alamat_jalan: string;
  lintang: string;
  bujur: string;
}

interface ApiResponse {
  dataSekolah: SchoolData[];
  total_data: number;
}

export default function ListSchool() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [datas, setDatas] = useState<ApiResponse>({
    dataSekolah: [],
    total_data: 1,
  });
  const [search, setSearch] = useState<string>('');
  const [pagination, setPagination] = useState<number>(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<SchoolData | null>(null);

  const [debouncedSearch, setDebouncedSearch] = useState(search);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPagination(1); // reset ke halaman pertama kalau ganti search
    }, 500); // delay 500ms

    return () => clearTimeout(handler); // bersihin timeout kalau user ketik lagi
  }, [search]);

  useEffect(() => {
    if (debouncedSearch && debouncedSearch.length < 3) return;
    const controller = new AbortController();

    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api-sekolah-indonesia.vercel.app/sekolah?page=${pagination}&sekolah=${search}`,
          { signal: controller.signal }
        );
        const data = await response.json();
        setDatas(data);
      } catch (error) {
        if (
          typeof error === 'object' &&
          error !== null &&
          'name' in error &&
          (error as { name?: string }).name !== 'AbortError'
        ) {
          console.error('Error fetching school data:', error);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, debouncedSearch]);

  const listData = datas.dataSekolah;

  return (
    <div className="bg-pastel-lemon min-h-dvh max-w-dvw flex flex-col justify-between relative">
      <div className="">
        <div className="text-center p-[2%] text-2xl sm:text-4xl lg:text-6xl uppercase tracking-tight leading-tight">
          <h2>Find your school</h2>
        </div>
        <div className="p-6 flex justify-center items-center">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for schools..."
            className="w-fll py-3 px-2 sm:w-1/2 border-3 border-black bg-pastel-lemon hover:bg-pastel-peach border-card"
          />
        </div>
        <div className="p-[2%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[20dvh] w-dvw overflow-hidden bg-pastel-lemon">
              <div className="loader"></div>
            </div>
          ) : (
            listData.map((item: SchoolData, index: number) => (
              <Card
                item={item}
                key={item.id}
                index={index}
                onSelect={() => {
                  setSelectedId(item.id);
                  setSelectedItem(item);
                }}
              />
            ))
          )}
        </div>
      </div>
      <div className="flex items-center justify-between sm:justify-center gap-x-2 lg:gap-4 p-[2%]">
        <button
          onClick={() => setPagination((prev) => (prev === 1 ? 1 : prev - 1))}
          disabled={pagination === 1}
          className="px-4 py-2 rounded bg-pastel-lavender border-card hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <span className="text-sm font-semibold font-lg sm:font-2xl">
          <span className="font-bold text-black">{pagination}</span> of{' '}
          <span className="font-bold text-slate-800">{datas.total_data}</span>
        </span>

        <button
          onClick={() => setPagination((prev) => prev + 1)}
          disabled={pagination === datas.total_data}
          className="px-4 py-2 rounded bg-pastel-lavender border-card hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
      {selectedId && selectedItem && (
        <DetailCard
          item={selectedItem}
          onClose={() => {
            setSelectedId(null);
            setSelectedItem(null);
          }}
        />
      )}
    </div>
  );
}

function Card({
  item,
  onSelect,
  index,
}: {
  item: SchoolData;
  onSelect: () => void;
  index: number;
}) {
  const { id, propinsi, sekolah } = item;
  const pastelColors = [
    'bg-pastel-pink hover:bg-pastel-pink',
    'bg-pastel-mint hover:bg-pastel-mint',
    'bg-pastel-sky hover:bg-pastel-sky',
    'bg-pastel-lavender hover:bg-pastel-lavender',
    'bg-pastel-lemon hover:bg-pastel-lemon',
  ];

  const colorClass = pastelColors[index % pastelColors.length];

  return (
    <div
      onClick={() => onSelect()}
      key={id}
      className={`px-4 py-2 border-3 border-black border-card cursor-pointer transition ${colorClass}`}
    >
      <h2 className="text-lg font-semibold text-black mb-1">
        Sekolah: {sekolah}
      </h2>
      <p className="text-sm text-slate-800 mb-1">
        <span className="font-medium">Propinsi:</span> {propinsi}
      </p>
    </div>
  );
}

function DetailCard({
  item,
  onClose,
}: {
  item: SchoolData;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="px-6 py-4 border-3 border-black rounded-xl bg-pastel-lemon border-card max-w-md w-[90%]">
        <h2 className="text-lg font-semibold text-blue-800 mb-2">
          {item.sekolah}
        </h2>
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-medium">Propinsi:</span> {item.propinsi}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-medium">Bentuk:</span> {item.bentuk}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-medium">Status:</span>{' '}
          {item.status === 'S' ? 'Swasta' : 'Negeri'}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-medium">Alamat:</span> {item.alamat_jalan}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-medium">Kecamatan:</span> {item.kecamatan}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-medium">NPSN:</span> {item.npsn}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Kota:</span> {item.kabupaten_kota}
        </p>

        <Link
          href={`https://www.google.com/maps?q=${item.lintang},${item.bujur}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 text-sm hover:underline mt-3 inline-block"
        >
          View on Google Maps
        </Link>
      </div>
    </div>
  );
}
