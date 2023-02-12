export const apiClient = {
    async get(url) {
      try {
        const response = await fetch(url);
        const data = await response.json();
        return data
      } catch (error) {
        console.error(error);
      }
    },
    async post(url, dataBody) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataBody)
        });
        const data = await response.json();
        return data
      } catch (error) {
        console.error(error);
      }
    }
  };