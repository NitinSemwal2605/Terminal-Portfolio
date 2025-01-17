document.addEventListener("DOMContentLoaded", function () {
    const terminalBody = document.querySelector(".terminal-body");
    const terminalHeader = document.querySelector(".terminal-header");
    const terminal = document.querySelector(".terminal");
    const commandHistory = [];
    let historyIndex = -1;
    let themeColors = {
        textColor: "#00ff00", // Default text color (green)
        headerColor: "white",
    };

    const commands = {
        "help": () => {
            return `
                <span style="color:${themeColors.textColor};">about</span>          - learn more about me <br>
                <span style="color:${themeColors.textColor};">clear</span>          - clear the terminal display <br>
                <span style="color:${themeColors.textColor};">echo</span>           - display custom text or messages <br>
                <span style="color:${themeColors.textColor};">education</span>      - explore my academic journey <br>
                <span style="color:${themeColors.textColor};">email</span>          - reach out via Email <br>
                <span style="color:${themeColors.textColor};">exit</span>           - close the current session <br>
                <span style="color:${themeColors.textColor};">help</span>           - get a list of available commands <br>
                <span style="color:${themeColors.textColor};">history</span>        - see your command usage history <br>
                <span style="color:${themeColors.textColor};">portfolio</span>      - view my website <br>
                <span style="color:${themeColors.textColor};">projects</span>       - check out my projects <br>
                <span style="color:${themeColors.textColor};">pwd</span>            - show the current working directory <br>
                <span style="color:${themeColors.textColor};">skills</span>         - view my skill set <br>
                <span style="color:${themeColors.textColor};">socials</span>        - discover my social media profiles <br>
                <span style="color:${themeColors.textColor};">themes</span>         - browse through available themes <br>
                <span style="color:${themeColors.textColor};">welcome</span>        - view the introductory section <br>
                <span style="color:${themeColors.textColor};">work</span>           - view my relevant experience <br>
                <span style="color:${themeColors.textColor};">whoami</span>         - find out who the current user is <br>
            `;
        },
        "themes": `Available themes: <br>ubuntu<br>git-bash<br>sunset<br>sweet<br><br>To change themes, type 'themes go to "theme-name"'.<br>Example: themes go to sunset`,
        "themes go to ubuntu": () => {
            terminal.style.backgroundColor = "#300a24";
            terminalHeader.style.backgroundColor = "#595959";
            terminalHeader.style.color = "white";
            terminalBody.style.color = "#00ff00";
            themeColors.textColor = "#00ff00";
            return "Switched to Ubuntu theme!";
        },
        "themes go to git-bash": () => {
            terminal.style.background = "linear-gradient(135deg, #1a1a1a, #2e2e2e)";
            terminalHeader.style.background = "linear-gradient(135deg, #2e2e2e, #444444)";
            terminalHeader.style.color = "#00ff00";
            terminalBody.style.color = "#00ff00";
            themeColors.textColor = "#00ff00";
            return "Switched to Git-Bash theme!";
        },
        "themes go to sunset": () => {
            terminal.style.background = "linear-gradient(in oklab, #ffff00, red)";
            terminalHeader.style.background = "linear-gradient(135deg, #ff7f50, #ff4500)";
            terminalHeader.style.color = "#ffffff";
            terminalBody.style.color = "#fffb00";
            themeColors.textColor = "#fffb00";
            return "Switched to Sunset theme!";
        },
        "themes go to sweet": () => {
            terminal.style.background = "linear-gradient(135deg, #ffb6c1, #ff69b4)";
            terminalHeader.style.background = "linear-gradient(135deg, #ffd9df, #ff69b4)";
            terminalHeader.style.color = "#ff178b";
            terminalBody.style.color = "#ff178b";
            themeColors.textColor = "#ff0f9f";
            return "Switched to Sweet theme!";
        },
        "about": "Hey👋 I'm a curious and creative full-stack developer proficient in MERN stack development. I love participating in hackathons and building innovative projects. <br> Always eager to learn, grow, and embrace new challenges.",
        "portfolio": () => {
            window.open("https://nitinsemwal.vercel.app", "_blank");
            return '';
        },
        "clear": () => { terminalBody.innerHTML = ''; return ''; },
        "echo": (args) => args.join(" "),
        "education": () => {
            return `<span style="color:${themeColors.textColor};">Chandigarh University</span> | 2022 - 2026  <br><span style="color:${themeColors.textColor};">Police Modern School</span> | 2020 - 2022`
        },
        "email": () => {
            window.open("mailto:55semwalnitin@gmail.com");
            return 'You can reach me at: 55semwalnitin@gmail.com';
        },
        "exit": () => window.close(),
        "history": () => commandHistory.join("<br>"),
        "projects": "You can visit my portfolio website / github to see all my projects <hr> These are my personal favorites: <br>1. Dressify - A Online Fashion Store<br> <img src='/images/Dressify.webp' style='width:75%; height:auto;'><br>2. PassBank - A Password Generator <br><img src='/images/password.avif' style='width:75%; height:auto;'><br>",
        "pwd": "You are currently in the root directory.",
        "skills": () => {
            return `I am a fast learner and highly motivated individual. <hr> <span style="color:${themeColors.textColor};">Languages</span>: C++,  JavaScript,  React <br><span style="color:${themeColors.textColor};">Tools</span>: Docker, Kubernetes, Git, Framer <br><span style="color:${themeColors.textColor};">Database Technologies</span>: MySQL, MongoDB <br><span style="color:${themeColors.textColor};">Strengths</span>: DSA, Frontend Development, UI/UX Design <br><span style="color:${themeColors.textColor};">Soft Skills</span>: Leadership, Team work, Communication, Time Management`},
        "socials": "Connect with me on <br>1. LinkedIn: https://www.linkedin.com/in/nitin-semwal/,<br>2. GitHub: https://github.com/NitinSemwal2605,<br>3. Twitter: https://x.com/nitintweetz",
        "welcome": "Hey There! I am Nitin Semwal, 3rd Year Enginnering Graduate from Chandigarh University, India. <br> An aspiring computer science student with strong interest in coding and full-stack mern development.",
        "work": () => {
            window.open("https://nitinsemwal.vercel.app/", "_blank");
            return 'Full Stack Developer ';
        },
        "whoami": "guest@user. But you should know who you are!",
    };

    function processCommand(input) {
        const [commandName, ...args] = input.toLowerCase().split(" ");
        let response;

        if (commands[`${commandName} ${args.join(" ")}`]) {
            response = typeof commands[`${commandName} ${args.join(" ")}`] === "function" ? commands[`${commandName} ${args.join(" ")}`](args) : commands[`${commandName} ${args.join(" ")}`];
        } else if (commands[commandName]) {
            response = typeof commands[commandName] === "function" ? commands[commandName](args) : commands[commandName];
        } else {
            response = `Command not found: ${commandName}`;
        }

        return response;
    }

    function addNewPrompt() {
        const newPrompt = document.createElement("p");
        newPrompt.classList.add("prompt");
        newPrompt.innerHTML = `nitinsemwal@desktop:~$ <span contenteditable="true" class="user-input"></span>`;
        terminalBody.appendChild(newPrompt);

        const newUserInput = newPrompt.querySelector(".user-input");
        newUserInput.focus();

        newUserInput.addEventListener("keydown", function(e) {
            if (e.key === "Enter") {
                e.preventDefault();
                const input = newUserInput.textContent.trim();
                if (input) {
                    commandHistory.push(input);
                    historyIndex = commandHistory.length;
                    newUserInput.setAttribute("contenteditable", "false");
                    const response = processCommand(input);
                    if (response) {
                        const responseElement = document.createElement("p");
                        responseElement.style.color = 'white'; 
                        responseElement.innerHTML = response;
                        terminalBody.appendChild(responseElement);
                    }
                    addNewPrompt();
                }
            } else if (e.key === "ArrowUp") {
                if (historyIndex > 0) {
                    historyIndex--;
                    newUserInput.textContent = commandHistory[historyIndex];
                    placeCaretAtEnd(newUserInput);
                }
            } else if (e.key === "ArrowDown") {
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    newUserInput.textContent = commandHistory[historyIndex];
                    placeCaretAtEnd(newUserInput);
                } else {
                    historyIndex = commandHistory.length;
                    newUserInput.textContent = "";
                }
            }
        });
    }

    function placeCaretAtEnd(el) {
        el.focus();
        if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
            const range = document.createRange();
            range.selectNodeContents(el);
            range.collapse(false);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (typeof document.body.createTextRange != "undefined") {
            const textRange = document.body.createTextRange();
            textRange.moveToElementText(el);
            textRange.collapse(false);
            textRange.select();
        }
    }

    addNewPrompt();
});
