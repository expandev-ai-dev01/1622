/**
 * @page HomePage
 * @summary Home page displaying welcome message and application overview.
 * @domain core
 * @type landing-page
 * @category public
 */
export const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Bem-vindo ao DataFlow</h1>
      <p className="text-lg text-gray-600 text-center max-w-2xl">
        Sistema simples e intuitivo para gerenciamento de registros, permitindo criar, visualizar,
        editar e excluir informações com praticidade.
      </p>
    </div>
  );
};

export default HomePage;
