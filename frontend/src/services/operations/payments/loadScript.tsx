const loadScript = async (src: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        
        script.onload = () => {
            resolve(true);
        };
        
        script.onerror = () => {
            reject(new Error(`Failed to load script: ${src}`));
        };
        
        // Add script to document head
        document.head.appendChild(script);
    });
};

export { loadScript };