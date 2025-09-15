import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: false, // matikan strict mode biar useEffect tidak dipanggil 2x di dev
}

export default nextConfig
