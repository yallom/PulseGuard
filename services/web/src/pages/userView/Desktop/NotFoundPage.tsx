export default function NotFoundPage() {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#F2EED3' }}>
        <div className="text-center max-w-2xl">
          <h1 className="text-9xl font-bold mb-4" style={{ color: '#2A4230' }}>
            404
          </h1>
          
          <h2 className="text-3xl font-semibold mb-4" style={{ color: '#3C653C' }}>
            Página não encontrada
          </h2>
          
          <p className="text-lg mb-8" style={{ color: '#2A4230' }}>
            Desculpe, a página que procura não existe ou foi movida.
          </p>
          
          <a
            href="/profile"
            className="inline-block px-8 py-3 rounded-lg font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: '#43B12E' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3C653C'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#43B12E'}
          >
            Voltar ao início
          </a>
          
          <div className="mt-12 flex justify-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FBBB2B' }}></div>
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#43B12E' }}></div>
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#3C653C' }}></div>
          </div>
        </div>
      </div>
    );
  }