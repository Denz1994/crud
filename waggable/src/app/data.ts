export const getQuestionsData = async () => {
    const res = await fetch("http://localhost:3000/api/questions");
  
    if (!res.ok) {
      throw new Error("Failed to fetch data.");
    }
    return res.json();
  };
