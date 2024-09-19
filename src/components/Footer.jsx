const Footer = () => {
    const team = [
      {
        name: "Yasser Alariqi",
        github: "https://github.com/teammate1",
        linkedin: "https://linkedin.com/in/teammate1",
      },
      {
        name: "Walled Alabasi",
        github: "https://github.com/teammate2",
        linkedin: "https://linkedin.com/in/teammate2",
      },
      {
        name: "Kareem Alabasi",
        github: "https://github.com/teammate3",
        linkedin: "https://linkedin.com/in/teammate3",
      },
    ];
  
    return (
      <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300 py-6">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Credits Section */}
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-lg font-semibold">Credits:</p>
              <ul className="mt-2 space-y-2">
                {team.map((member, index) => (
                  <li key={index}>
                    <span className="font-bold">{member.name}</span> -{" "}
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 dark:text-blue-400 hover:underline"
                    >
                      GitHub
                    </a>{" "}
                    |{" "}
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 dark:text-blue-400 hover:underline"
                    >
                      LinkedIn
                    </a>
                  </li>
                ))}
              </ul>
            </div>
  
            <div className="text-center">
              <p className="text-sm">© 2024 Your Project. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  