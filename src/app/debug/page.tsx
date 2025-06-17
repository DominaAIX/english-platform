export default function Debug() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug - Environment Variables</h1>
      <div className="bg-gray-100 p-4 rounded">
        <p><strong>NEXT_PUBLIC_IS_STAGING:</strong> {process.env.NEXT_PUBLIC_IS_STAGING || 'undefined'}</p>
        <p><strong>NEXT_PUBLIC_VERCEL_ENV:</strong> {process.env.NEXT_PUBLIC_VERCEL_ENV || 'undefined'}</p>
        <p><strong>NODE_ENV:</strong> {process.env.NODE_ENV || 'undefined'}</p>
      </div>
    </div>
  );
}