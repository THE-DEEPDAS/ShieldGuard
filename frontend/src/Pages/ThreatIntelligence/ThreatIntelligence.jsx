import React, { useEffect, useState } from "react";
import Header from "../Home/Header/Header"; // Add Header import
import "./ThreatIntelligence.css";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);

const ThreatIntelligence = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");

  const summarizeAndAnalyzeNews = async (articles) => {
    const summarizedNews = [...news]; // Keep previously processed news

    for (const article of articles) {
      try {
        setStatus(`Processing article: ${article.title}`);
        const summary = await summarizeArticle(article.content);
        const threatLevel = await analyzeThreatLevel(summary);
        summarizedNews.push({
          title: article.title,
          description: summary,
          threatLevel,
        });
        summarizedNews.sort((a, b) => b.threatLevel - a.threatLevel); // Sort by threat level in descending order
        setNews([...summarizedNews]);
        setStatus(`Completed processing article: ${article.title}`);
      } catch (error) {
        console.error("Error summarizing or analyzing article:", error);
        summarizedNews.push({
          title: article.title,
          description: "Failed to summarize or analyze this article.",
          threatLevel: 0,
        });
        summarizedNews.sort((a, b) => b.threatLevel - a.threatLevel); // Sort by threat level in descending order
        setNews([...summarizedNews]);
        setStatus(`Failed to process article: ${article.title}`);
      }
      await new Promise((resolve) => setTimeout(resolve, 40000)); // Wait for 40 seconds before processing the next article
    }
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/threat-intelligence`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        summarizeAndAnalyzeNews(data.articles); // Process articles one by one
      } catch (error) {
        console.error("Error fetching news:", error);
        setError("Failed to fetch news. Please try again later.");
      }
    };

    fetchNews();
  }, []);

  const summarizeArticle = async (content) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Summarize the following news article: ${content}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Error summarizing article:", error);
      throw new Error("Failed to summarize article.");
    }
  };

  const analyzeThreatLevel = async (summary) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Analyze the following news summary for potential threats: ${summary}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const analysis = response.text();

      const threatKeywords = [
        "attack",
        "war",
        "terrorism",
        "conflict",
        "danger",
      ];
      const threatCount = threatKeywords.reduce(
        (count, keyword) => count + (analysis.includes(keyword) ? 1 : 0),
        0
      );

      return (threatCount / threatKeywords.length) * 100;
    } catch (error) {
      console.error("Error analyzing threat level:", error);
      throw new Error("Failed to analyze threat level.");
    }
  };

  const getThreatLevelClass = (threatLevel) => {
    if (threatLevel > 80) return "threat-high";
    if (threatLevel > 50) return "threat-medium";
    return "threat-low";
  };

  return (
    <>
      <Header />
      <div className="threat-intelligence">
        <h1>Real-Time Threat Intelligence Dashboard</h1>
        {status && <p className="status-message">{status}</p>}
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="news-list">
            {news.map((item, index) => (
              <div
                key={index}
                className={`news-item ${getThreatLevelClass(item.threatLevel)}`}
              >
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <p>Threat Level: {item.threatLevel}%</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ThreatIntelligence;
