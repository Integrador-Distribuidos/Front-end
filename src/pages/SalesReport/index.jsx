import React, { useState, useEffect } from 'react';
import styles from "../SalesReport/SalesReport.module.css";
import Header from '../../components/Header/Index.jsx';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/index.jsx';
import NavBar from '../../components/SideBar/Index.jsx';
import axios from 'axios';

const SalesReport = () => {
  const [startDate, setStartDate] = useState(() => localStorage.getItem("reportStartDate") || "");
  const [endDate, setEndDate] = useState(() => localStorage.getItem("reportEndDate") || "");
  const [selectedStore, setSelectedStore] = useState(() => localStorage.getItem("reportSelectedStore") || "");
  const [stores, setStores] = useState([]);
  const [reportData, setReportData] = useState(() => {
    const stored = localStorage.getItem("reportData");
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // Buscar lista de lojas do backend
    const fetchStores = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/stores/`);
        setStores(res.data);
      } catch (error) {
        console.error("Erro ao buscar lojas:", error);
      }
    };
    fetchStores();

    const savedData = localStorage.getItem("reportData");
    if (savedData) {
      setReportData(JSON.parse(savedData));
    }
    const savedStore = localStorage.getItem("reportSelectedStore");
    if (savedStore) {
      setSelectedStore(savedStore);
    }
  }, []);

  const handleFetchReport = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_PAYMENTS_BASE_URL}/payments/invoices/sales_report/`, {
        params: {
          start_date: startDate,
          end_date: endDate,
          store_id: selectedStore || undefined,
        }
      });

      setReportData(response.data);

      localStorage.setItem("reportData", JSON.stringify(response.data));
      localStorage.setItem("reportStartDate", startDate);
      localStorage.setItem("reportEndDate", endDate);
      localStorage.setItem("reportSelectedStore", selectedStore);
    } catch (error) {
      setErrorMsg("Erro ao buscar o relatório. Verifique os dados ou tente novamente.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;

    const [year, month, day] = dateString.split("-");
    const date = new Date(year, month - 1, day);

    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const renderPeriodo = () => {
    const inicio = formatDate(reportData?.periodo?.inicio);
    const fim = formatDate(reportData?.periodo?.fim);

    if (!inicio && !fim) {
      return "Todo o Período";
    }

    return `${inicio || "?"} à ${fim || "?"}`;
  };

  return (
    <>
      <Header />
      <div className={styles['breadcrumb-sales-report']}>
        <Link to="/" className={styles['element-1-breadcrumb-sales-report']}>Página Inicial</Link>
        <p className={styles['div-contentegt-1-sales-report']}>&gt;</p>
        <Link to="/" className={styles['element-1-breadcrumb-sales-report']}>Painel de Controle</Link>
        <p className={styles['div-contentegt-1-sales-report']}>&gt;</p>
        <span className={styles['element-2-breadcrumb-sales-report']}>Relatório de Vendas</span>
      </div>
      <div className={styles['breadcrumb-separator-line-sales-report']}></div>
      <NavBar />
      <div className={styles["header-sectionst"]}>
        <h1 className={styles['h1-registed-stocks']}>Relatório de Vendas</h1>
        <div className={styles["actions-containerst"]}>
          <div className={styles["filterst"]}>
            <label htmlFor="startDate">Data Início:</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className={styles["filterst"]}>
            <label htmlFor="endDate">Data Fim:</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className={styles["filterst"]}>
            <label htmlFor="storeSelect">Loja:</label>
            <select
              id="storeSelect"
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
            >
              <option value="">Todas as lojas</option>
              {stores.map((store) => (
                <option key={store.id_store} value={store.id_store}>
                  {store.name}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleFetchReport} className={styles["button-cadastrarst"]}>
            Gerar Relatório
          </button>
        </div>
      </div>
      <div className={styles["content-containerst"]}>
        {loading && <p>Carregando...</p>}
        {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

        {reportData && (
          <div className={styles["report-result"]}>
            {reportData.total_vendas === 0 ? (
              <p>Nenhuma venda realizada no período selecionado.</p>
            ) : (
              <>
                <p><strong>Total de Vendas:</strong> {reportData.total_vendas}</p>
                <p><strong>Valor Total:</strong> R$ {(reportData.valor_total ?? 0).toFixed(2)}</p>
                <p><strong>Período:</strong> {renderPeriodo()}</p>
              </>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SalesReport;
