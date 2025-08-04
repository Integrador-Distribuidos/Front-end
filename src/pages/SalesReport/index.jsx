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
  const [reportData, setReportData] = useState(() => {
    const stored = localStorage.getItem("reportData");
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFetchReport = async () => {
    console.log("Datas enviadas:", startDate, endDate);
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await axios.get(`http://localhost:8002/payments/invoices/sales_report/`, {
        params: {
          start_date: startDate,
          end_date: endDate
        }
      });

      console.log("Resposta da API:", response.data);
      setReportData(response.data);

      localStorage.setItem("reportData", JSON.stringify(response.data));
      localStorage.setItem("reportStartDate", startDate);
      localStorage.setItem("reportEndDate", endDate);
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

  useEffect(() => {
    const savedData = localStorage.getItem("reportData");
    if (savedData) {
      setReportData(JSON.parse(savedData));
    }
  }, []);

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
