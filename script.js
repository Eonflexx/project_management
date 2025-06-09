    // --- NEW: AI Feature Modal Functions ---
        // Tab functionality
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all tabs and contents
                document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

                // Add active class to clicked tab and corresponding content
                button.classList.add('active');
                document.getElementById(button.getAttribute('data-tab')).classList.add('active');
            });
        });

        // Copy functionality for code blocks
        document.querySelectorAll('.code-block').forEach(block => {
            const copyBtn = document.createElement('button');
            copyBtn.classList.add('copy-button');
            copyBtn.innerText = 'Copy';
            block.appendChild(copyBtn);

            copyBtn.addEventListener('click', () => {
                const code = block.innerText;
                navigator.clipboard.writeText(code);
                copyBtn.innerText = 'Copied!';
                setTimeout(() => copyBtn.innerText = 'Copy', 1000);
            });
        });

        // --- Theme Toggle Functionality ---
        function toggleTheme() {
            // When inside a modal, the main guide's container acts as the themed element
            const themedElement = document.querySelector('.main-guide-modal-content .container');
            if (!themedElement) return; // Should not happen if structure is correct

            const currentTheme = themedElement.getAttribute('data-theme');

            if (currentTheme === 'light') {
                themedElement.removeAttribute('data-theme'); // Revert to default (dark)
            } else {
                themedElement.setAttribute('data-theme', 'light'); // Apply light theme
            }
        }

        // --- Main Guide Modal Functionality ---
        function openMainGuideModal() {
            document.getElementById('mainGuideModal').classList.add('active');
            // Hide the parent page scrollbar when modal is open
            document.body.style.overflow = 'hidden';
        }

        function closeMainGuideModal() {
            document.getElementById('mainGuideModal').classList.remove('active');
            // Restore parent page scrollbar
            document.body.style.overflow = '';
        }

        // --- Shortlist Modal Functionality (Internal) ---
        function openModal() {
            document.getElementById('shortlistModal').classList.add('active');
        }

        function closeModal() {
            document.getElementById('shortlistModal').classList.remove('active');
        }

        // --- Step-by-Step Modal Functionality (Internal) ---
        // Global object to store step content for dynamic loading
        const stepData = {
            'setup-init-folder': {
                title: 'Step 1: Create Project Folder & Navigate',
                windows: `
            <p>This creates your main project container folder and navigates into it in Windows Command Prompt or PowerShell:</p>
            <div class="command-block">
                <label for="win-cmd-1">Command:</label>
                <input type="text" id="win-cmd-1" class="command-input" value="mkdir my-awesome-project" readonly>
                <button class="copy-button" onclick="copyToClipboard('win-cmd-1')">Copy</button>
            </div>
            <div class="command-block">
                <label for="win-cmd-2">Command:</label>
                <input type="text" id="win-cmd-2" class="command-input" value="cd my-awesome-project" readonly>
                <button class="copy-button" onclick="copyToClipboard('win-cmd-2')">Copy</button>
            </div>
            <div class="use-case">
                <h4>Purpose:</h4>
                <p>Establishes the root directory for your new VS Code project, ensuring all subsequent Git commands are executed within the correct scope.</p>
            </div>
        `,
                bash: `
            <p>This creates your main project container folder and navigates into it in Git Bash, WSL, or other Unix-like terminals:</p>
            <div class="command-block">
                <label for="bash-cmd-1">Command:</label>
                <input type="text" id="bash-cmd-1" class="command-input" value="mkdir my-awesome-project" readonly>
                <button class="copy-button" onclick="copyToClipboard('bash-cmd-1')">Copy</button>
            </div>
            <div class="command-block">
                <label for="bash-cmd-2">Command:</label>
                <input type="text" id="bash-cmd-2" class="command-input" value="cd my-awesome-project" readonly>
                <button class="copy-button" onclick="copyToClipboard('bash-cmd-2')">Copy</button>
            </div>
            <div class="use-case">
                <h4>Purpose:</h4>
                <p>Establishes the root directory for your new VS Code project, ensuring all subsequent Git commands are executed within the correct scope.</p>
            </div>
        `
            },
            'setup-readme': {
                title: 'Step 2: Create README.md File',
                windows: `
            <p>Create a <code>README.md</code> file for your project documentation in Windows PowerShell:</p>
            <div class="command-block">
                <label for="win-readme-cmd">Command:</label>
                <input type="text" id="win-readme-cmd" class="command-input" value="New-Item README.md -ItemType File" readonly>
                <button class="copy-button" onclick="copyToClipboard('win-readme-cmd')">Copy</button>
            </div>
            <div class="use-case">
                <h4>Purpose:</h4>
                <p><code>README.md</code> is crucial for explaining your project, its purpose, setup instructions, and usage. It's the first thing people (including your future self) look at when encountering your repository.</p>
            </div>
        `,
                bash: `
            <p>Create a <code>README.md</code> file for your project documentation in Bash/Mac/Linux:</p>
            <div class="command-block">
                <label for="bash-readme-cmd">Command:</label>
                <input type="text" id="bash-readme-cmd" class="command-input" value="touch README.md" readonly>
                <button class="copy-button" onclick="copyToClipboard('bash-readme-cmd')">Copy</button>
            </div>
            <div class="use-case">
                <h4>Purpose:</h4>
                <p><code>README.md</code> is crucial for explaining your project, its purpose, setup instructions, and usage. It's the first thing people (including your future self) look at when encountering your repository.</p>
            </div>
        `
            },
            'setup-git-init': {
                title: 'Step 3: Initialize Git Repository',
                windows: `
            <p>This command turns your current folder into a Git repository for version control. This command is the same for both Windows and Bash:</p>
            <div class="command-block">
                <label for="git-init-cmd">Command:</label>
                <input type="text" id="git-init-cmd" class="command-input" value="git init" readonly>
                <button class="copy-button" onclick="copyToClipboard('git-init-cmd')">Copy</button>
            </div>
            <div class="use-case">
                <h4>What happens:</h4>
                <p>A hidden <code>.git</code> directory is created in your project's root folder. This directory contains all the necessary metadata and object database for Git to track changes, manage history, and facilitate collaboration.</p>
                <h4>Verify Initialization:</h4>
                <div class="command-block">
                    <label for="git-status-verify">Command:</label>
                    <input type="text" id="git-status-verify" class="command-input" value="git status" readonly>
                    <button class="copy-button" onclick="copyToClipboard('git-status-verify')">Copy</button>
                </div>
                <p style="margin-top: var(--spacing-xs); opacity: 0.8;">After <code>git init</code>, <code>git status</code> should show your <code>README.md</code> (and any other existing project files) as "Untracked files."</p>
            </div>
        `,
                bash: `
            <p>This command turns your current folder into a Git repository for version control. This command is the same for both Windows and Bash:</p>
            <div class="command-block">
                <label for="git-init-cmd-bash">Command:</label>
                <input type="text" id="git-init-cmd-bash" class="command-input" value="git init" readonly>
                <button class="copy-button" onclick="copyToClipboard('git-init-cmd-bash')">Copy</button>
            </div>
            <div class="use-case">
                <h4>What happens:</h4>
                <p>A hidden <code>.git</code> directory is created in your project's root folder. This directory contains all the necessary metadata and object database for Git to track changes, manage history, and facilitate collaboration.</p>
                <h4>Verify Initialization:</h4>
                <div class="command-block">
                    <label for="git-status-verify-bash">Command:</label>
                    <input type="text" id="git-status-verify-bash" class="command-input" value="git status" readonly>
                    <button class="copy-button" onclick="copyToClipboard('git-status-verify-bash')">Copy</button>
                </div>
                <p style="margin-top: var(--spacing-xs); opacity: 0.8;">After <code>git init</code>, <code>git status</code> should show your <code>README.md</code> (and any other existing project files) as "Untracked files."</p>
            </div>
        `
            },
            'setup-connect-remote': {
                title: 'Step 4: Connect to Remote GitHub Repository',
                windows: `
            <div class="use-case">
                <h4>First, create your repository on GitHub.com:</h4>
                <p>1. Go to <a href="https://github.com" target="_blank" style="color: var(--accent-color);">github.com</a> and click the "New" button (usually green, top-right).
                <p>2. Give it the same name as your local project (e.g., <code>my-awesome-project</code>) for consistency.</p>
                <p>3. <strong>Important:</strong> Do NOT check the box to initialize with a README, .gitignore, or license. You already have a local <code>README.md</code> and will push your existing project files.</p>
                <p>4. Click "Create repository". On the next page, copy the HTTPS URL provided for your new repository (it will look like <code>https://github.com/YOUR_USERNAME/my-awesome-project.git</code>).</p>
            </div>
            <p>Then connect your local repository to the remote one using the copied URL:</p>
            <div class="command-block">
                <label for="git-remote-cmd">Command:</label>
                <input type="text" id="git-remote-cmd" class="command-input" value="git remote add origin https://github.com/YOUR_USERNAME/my-awesome-project.git" readonly>
                <button class="copy-button" onclick="copyToClipboard('git-remote-cmd')">Copy</button>
            </div>
            <div class="use-case">
                <h4>Replace <code>YOUR_USERNAME</code> with your actual GitHub username.</h4>
                <p>This command tells your local Git repository where its remote counterpart ("origin" is the conventional name for the primary remote) is located on GitHub.</p>
                <p><strong>Verification:</strong> To confirm the remote was added, you can run: <code>git remote -v</code></p>
            </div>
        `,
                bash: `
            <div class="use-case">
                <h4>First, create your repository on GitHub.com:</h4>
                <p>1. Go to <a href="https://github.com" target="_blank" style="color: var(--accent-color);">github.com</a> and click the "New" button (usually green, top-right).
                <p>2. Give it the same name as your local project (e.g., <code>my-awesome-project</code>) for consistency.</p>
                <p>3. <strong>Important:</strong> Do NOT check the box to initialize with a README, .gitignore, or license. You already have a local <code>README.md</code> and will push your existing project files.</p>
                <p>4. Click "Create repository". On the next page, copy the HTTPS URL provided for your new repository (it will look like <code>https://github.com/YOUR_USERNAME/my-awesome-project.git</code>).</p>
            </div>
            <p>Then connect your local repository to the remote one using the copied URL:</p>
            <div class="command-block">
                <label for="git-remote-cmd-bash">Command:</label>
                <input type="text" id="git-remote-cmd-bash" class="command-input" value="git remote add origin https://github.com/YOUR_USERNAME/my-awesome-project.git" readonly>
                <button class="copy-button" onclick="copyToClipboard('git-remote-cmd-bash')">Copy</button>
            </div>
            <div class="use-case">
                <h4>Replace <code>YOUR_USERNAME</code> with your actual GitHub username.</h4>
                <p>This command tells your local Git repository where its remote counterpart ("origin" is the conventional name for the primary remote) is located on GitHub.</p>
                <p><strong>Verification:</strong> To confirm the remote was added, you can run: <code>git remote -v</code></p>
            </div>
        `
            },
            'add-project-stage': {
                title: 'Step 1: Stage Project Files',
                windows: `
            <p>Add all changes (new, modified, deleted files) in your current directory and its subdirectories to the Git staging area:</p>
            <div class="command-block">
                <label for="git-add-cmd">Command:</label>
                <input type="text" id="git-add-cmd" class="command-input" value="git add ." readonly>
                <button class="copy-button" onclick="copyToClipboard('git-add-cmd')">Copy</button>
            </div>
            <div class="use-case">
                <h4>Purpose:</h4>
                <p>The <code>.</code> (dot) signifies "all changes in the current directory and subdirectories." This command prepares all your existing project files to be included in the next commit, signaling to Git that you want to snapshot these changes.</p>
                <p><strong>Alternative:</strong> If you only want to stage specific files, you can use: <br><code>git add YourFileName.txt</code> <br>or to stage a specific folder: <br><code>git add YourFolder/</code></p>
            </div>
        `,
                bash: `
            <p>Add all changes (new, modified, deleted files) in your current directory and its subdirectories to the Git staging area:</p>
            <div class="command-block">
                <label for="git-add-cmd-bash">Command:</label>
                <input type="text" id="git-add-cmd-bash" class="command-input" value="git add ." readonly>
                <button class="copy-button" onclick="copyToClipboard('git-add-cmd-bash')">Copy</button>
            </div>
            <div class="use-case">
                <h4>Purpose:</h4>
                <p>The <code>.</code> (dot) signifies "all changes in the current directory and subdirectories." This command prepares all your existing project files to be included in the next commit, signaling to Git that you want to snapshot these changes.</p>
                <p><strong>Alternative:</strong> If you only want to stage specific files, you can use: <br><code>git add YourFileName.txt</code> <br>or to stage a specific folder: <br><code>git add YourFolder/</code></p>
            </div>
        `
            },
            'add-project-status': {
                title: 'Step 2: Check Current Status',
                windows: `
            <p>Always a good idea to see what Git is tracking. This command provides a summary of your repository's state:</p>
            <div class="command-block">
                <label for="git-status-check">Command:</label>
                <input type="text" id="git-status-check" class="command-input" value="git status" readonly>
                <button class="copy-button" onclick="copyToClipboard('git-status-check')">Copy</button>
            </div>
            <div class="use-case">
                <h4>What it shows:</h4>
                <p>Lists files that are staged for the next commit ("Changes to be committed"), files that have been modified but not yet staged ("Changes not staged for commit"), and untracked files (new files not yet added to Git). This helps you confirm that all desired files are ready for commitment and identify any forgotten changes.</p>
            </div>
        `,
                bash: `
            <p>Always a good idea to see what Git is tracking. This command provides a summary of your repository's state:</p>
            <div class="command-block">
                <label for="git-status-check-bash">Command:</label>
                <input type="text" id="git-status-check-bash" class="command-input" value="git status" readonly>
                <button class="copy-button" onclick="copyToClipboard('git-status-check-bash')">Copy</button>
            </div>
            <div class="use-case">
                <h4>What it shows:</h4>
                <p>Lists files that are staged for the next commit ("Changes to be committed"), files that have been modified but not yet staged ("Changes not staged for commit"), and untracked files (new files not yet added to Git). This helps you confirm that all desired files are ready for commitment and identify any forgotten changes.</p>
            </div>
        `
            },
            'add-project-commit': {
                title: 'Step 3: Commit Changes',
                windows: `
            <p>Save your staged changes to your local repository's history. The <code>-m</code> flag allows you to provide a commit message directly:</p>
            <div class="command-block">
                <label for="git-commit-cmd">Command:</label>
                <input type="text" id="git-commit-cmd" class="command-input" value='git commit -m "Initial project commit"' readonly>
                <button class="copy-button" onclick="copyToClipboard('git-commit-cmd')">Copy</button>
            </div>
            <div class="use-case">
                <h4>Importance of a good message:</h4>
                <p>Your commit message should be concise yet descriptive, explaining what changes were made in that particular snapshot. Clear messages are vital for understanding project history, debugging, and collaborating with others.</p>
                <h4>Refactor Commit Scenarios (Conventional Commits):</h4>
                <p>Using conventional commit messages helps standardize your commit history, making it more readable and allowing for automated tooling (e.g., generating changelogs).</p>
                <ul>
                    <li><code>feat: Implement user profile page</code> (<strong>feat:</strong> new feature)</li>
                    <li><code>fix: Correct styling issue on homepage</code> (<strong>fix:</strong> bug fix)</li>
                    <li><code>docs: Add API endpoint documentation</code> (<strong>docs:</strong> documentation changes)</li>
                    <li><code>refactor: Optimize database queries</code> (<strong>refactor:</strong> code refactoring, no new features or bug fixes)</li>
                    <li><code>chore: Update npm packages</code> (<strong>chore:</strong> routine tasks, e.g., dependency updates, build process changes)</li>
                    <li><code>style: Format code with Prettier</code> (<strong>style:</strong> code style changes, no semantic changes)</li>
                    <li><code>test: Add unit tests for login component</code> (<strong>test:</strong> adding or correcting tests)</li>
                </ul>
            </div>
        `,
                bash: `
            <p>Save your staged changes to your local repository's history. The <code>-m</code> flag allows you to provide a commit message directly:</p>
            <div class="command-block">
                <label for="git-commit-cmd-bash">Command:</label>
                <input type="text" id="git-commit-cmd-bash" class="command-input" value='git commit -m "Initial project commit"' readonly>
                <button class="copy-button" onclick="copyToClipboard('git-commit-cmd-bash')">Copy</button>
            </div>
            <div class="use-case">
                <h4>Importance of a good message:</h4>
                <p>Your commit message should be concise yet descriptive, explaining what changes were made in that particular snapshot. Clear messages are vital for understanding project history, debugging, and collaborating with others.</p>
                <h4>Refactor Commit Scenarios (Conventional Commits):</h4>
                <p>Using conventional commit messages helps standardize your commit history, making it more readable and allowing for automated tooling (e.g., generating changelogs).</p>
                <ul>
                    <li><code>feat: Implement user profile page</code> (<strong>feat:</strong> new feature)</li>
                    <li><code>fix: Correct styling issue on homepage</code> (<strong>fix:</strong> bug fix)</li>
                    <li><code>docs: Add API endpoint documentation</code> (<strong>docs:</strong> documentation changes)</li>
                    <li><code>refactor: Optimize database queries</code> (<strong>refactor:</strong> code refactoring, no new features or bug fixes)</li>
                    <li><code>chore: Update npm packages</code> (<strong>chore:</strong> routine tasks, e.g., dependency updates, build process changes)</li>
                    <li><code>style: Format code with Prettier</code> (<strong>style:</strong> code style changes, no semantic changes)</li>
                    <li><code>test: Add unit tests for login component</code> (<strong>test:</strong> adding or correcting tests)</li>
                </ul>
            </div>
        `
            },
            'add-project-push': {
                title: 'Step 4: Push Changes Online',
                windows: `
            <p>Upload your local commits to your linked GitHub repository. This command makes your local history visible on the remote:</p>
            <div class="command-block">
                <label for="git-push-initial">First Push (use only once per new branch):</label>
                <input type="text" id="git-push-initial" class="command-input" value="git push -u origin main" readonly>
                <button class="copy-button" onclick="copyToClipboard('git-push-initial')">Copy</button>
            </div>
            <div class="use-case">
                <h4>Explanation of <code>-u origin main</code>:</h4>
                <p>The <code>-u</code> (or <code>--set-upstream</code>) flag is used during the *first* push of a new branch. It tells Git to set <code>origin</code> as the default remote and <code>main</code> (or your branch name) as the default upstream branch for your current local branch. This simplifies future pushes.</p>
                <p>After running this once for your <code>main</code> branch, subsequent pushes from <code>main</code> can be shorter.</p>
            </div>
            <div class="command-block">
                <label for="git-push-subsequent">Subsequent Pushes:</label>
                <input type="text" id="git-push-subsequent" class="command-input" value="git push" readonly>
                <button class="copy-button" onclick="copyToClipboard('git-push-subsequent')">Copy</button>
            </div>
            <div class="use-case">
                <h4>Purpose of <code>git push</code>:</h4>
                <p>Sends your new local commits (those that are not yet on the remote) to the GitHub repository. It's how you synchronize your local work with the online version, making it accessible to others and serving as a backup.</p>
            </div>
        `,
                bash: `
            <p>Upload your local commits to your linked GitHub repository. This command makes your local history visible on the remote:</p>
            <div class="command-block">
                <label for="git-push-initial-bash">Command:</label>
                <input type="text" id="git-push-initial-bash" class="command-input" value="git push -u origin main" readonly>
                <button class="copy-button" onclick="copyToClipboard('git-push-initial-bash')">Copy</button>
            </div>
            <div class="use-case">
                <h4>Explanation of <code>-u origin main</code>:</h4>
                <p>The <code>-u</code> (or <code>--set-upstream</code>) flag is used during the *first* push of a new branch. It tells Git to set <code>origin</code> as the default remote and <code>main</code> (or your branch name) as the default upstream branch for your current local branch. This simplifies future pushes.</p>
                <p>After running this once for your <code>main</code> branch, subsequent pushes from <code>main</code> can be shorter.</p>
            </div>
            <div class="command-block">
                <label for="git-push-subsequent-bash">Subsequent Pushes:</label>
                <input type="text" id="git-push-subsequent-bash" class="command-input" value="git push" readonly>
                <button class="copy-button" onclick="copyToClipboard('git-push-subsequent-bash')">Copy</button>
            </div>
            <div class="use-case">
                <h4>Purpose of <code>git push</code>:</h4>
                <p>Sends your new local commits (those that are not yet on the remote) to the GitHub repository. It's how you synchronize your local work with the online version, making it accessible to others and serving as a backup.</p>
            </div>
        `
            }
        };

        function openStepModal(stepId) {
            const stepTitleElement = document.getElementById('stepTitle');
            const stepContentElement = document.getElementById('stepContent');
            const stepModal = document.getElementById('stepModal');

            // Find the currently active system tab (Windows or Bash)
            const activeTab = document.querySelector('.command-tab.active');
            const currentSystem = activeTab ? activeTab.dataset.system : 'windows'; // Default to Windows

            if (stepData[stepId]) {
                stepTitleElement.textContent = stepData[stepId].title;
                // Set the content based on the currently active system
                stepContentElement.innerHTML = stepData[stepId][currentSystem];
                stepModal.classList.add('active');
            }
        }

        function closeStepModal() {
            document.getElementById('stepModal').classList.remove('active');
        }

        // Function to switch between Windows and Bash commands in the step modal
        function switchCommandSystem(systemType) {
            const tabs = document.querySelectorAll('.command-tab');
            tabs.forEach(tab => {
                // Update active class for tabs
                if (tab.dataset.system === systemType) {
                    tab.classList.add('active');
                } else {
                    tab.classList.remove('active');
                }
            });

            // If the step modal is active, update its content based on the new systemType
            const stepModal = document.getElementById('stepModal');
            if (stepModal.classList.contains('active')) {
                const stepTitle = document.getElementById('stepTitle').textContent;
                // Find the step ID based on its title
                const currentStepId = Object.keys(stepData).find(key => stepData[key].title === stepTitle);

                if (currentStepId && stepData[currentStepId][systemType]) {
                    const stepContentElement = document.getElementById('stepContent');
                    stepContentElement.innerHTML = stepData[currentStepId][systemType];
                }
            }
        }

        // --- NEW: AI Feature Modal Functions ---
        function openAIGeneratorModal() {
            document.getElementById('commitMessageGeneratorModal').classList.add('active');
            // Clear previous content
            document.getElementById('commitChangesInput').value = '';
            document.getElementById('commitMessageOutput').textContent = 'Your generated commit message will appear here.';
        }

        function closeAIGeneratorModal() {
            document.getElementById('commitMessageGeneratorModal').classList.remove('active');
        }

        function openAIExplainerModal() {
            document.getElementById('commandExplainerModal').classList.add('active');
            // Clear previous content
            document.getElementById('gitCommandInput').value = '';
            document.getElementById('gitCommandExplanationOutput').textContent = 'The explanation will appear here.';
        }

        function closeAIExplainerModal() {
            document.getElementById('commandExplainerModal').classList.remove('active');
        }

        // --- NEW: Gemini API Integration Functions ---
        async function generateCommitMessage() {
            const changesInput = document.getElementById('commitChangesInput').value.trim();
            const outputArea = document.getElementById('commitMessageOutput');
            const loadingIndicator = document.getElementById('loadingIndicatorCommit');

            if (!changesInput) {
                outputArea.textContent = "Please describe your changes to generate a commit message.";
                return;
            }

            loadingIndicator.style.display = 'flex';
            outputArea.textContent = ''; // Clear previous output

            let chatHistory = [];
            chatHistory.push({
                role: "user",
                parts: [{
                    text: `Generate a concise and conventional Git commit message (e.g., 'feat: Add user profile page') based on these changes: ${changesInput}`
                }]
            });

            const payload = { contents: chatHistory };
            const apiKey = ""; // If you want to use models other than gemini-2.0-flash or imagen-3.0-generate-002, provide an API key here. Otherwise, leave this as-is.
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const result = await response.json();
                if (result.candidates && result.candidates.length > 0 &&
                    result.candidates[0].content && result.candidates[0].content.parts &&
                    result.candidates[0].content.parts.length > 0) {
                    const text = result.candidates[0].content.parts[0].text;
                    outputArea.textContent = text;
                } else {
                    outputArea.textContent = "Failed to generate message. Please try again or refine your input.";
                    console.error("Unexpected API response structure:", result);
                }
            } catch (error) {
                outputArea.textContent = "Error generating message. Please check your network connection or try again later.";
                console.error("Error calling Gemini API for commit message:", error);
            } finally {
                loadingIndicator.style.display = 'none';
            }
        }

        async function explainGitCommand() {
            const commandInput = document.getElementById('gitCommandInput').value.trim();
            const outputArea = document.getElementById('gitCommandExplanationOutput');
            const loadingIndicator = document.getElementById('loadingIndicatorExplain');

            if (!commandInput) {
                outputArea.textContent = "Please enter a Git command to explain.";
                return;
            }

            loadingIndicator.style.display = 'flex';
            outputArea.textContent = ''; // Clear previous output

            let chatHistory = [];
            chatHistory.push({
                role: "user",
                parts: [{
                    text: `Explain the Git command '${commandInput}' in simple, clear terms. Include its primary purpose, common use cases, and any important caveats or potential pitfalls. Provide output as a markdown formatted string.`
                }]
            });

            const payload = { contents: chatHistory };
            const apiKey = ""; // If you want to use models other than gemini-2.0-flash or imagen-3.0-generate-002, provide an API key here. Otherwise, leave this as-is.
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const result = await response.json();
                if (result.candidates && result.candidates.length > 0 &&
                    result.candidates[0].content && result.candidates[0].content.parts &&
                    result.candidates[0].content.parts.length > 0) {
                    const text = result.candidates[0].content.parts[0].text;
                    outputArea.innerHTML = marked.parse(text); // Use marked.js for Markdown parsing
                } else {
                    outputArea.textContent = "Failed to explain command. Please try again or check the command syntax.";
                    console.error("Unexpected API response structure:", result);
                }
            } catch (error) {
                outputArea.textContent = "Error explaining command. Please check your network connection or try again later.";
                console.error("Error calling Gemini API for command explanation:", error);
            } finally {
                loadingIndicator.style.display = 'none';
            }
        }

        // --- Marked.js for Markdown parsing (for AI explanations) ---
        // Load marked.js library dynamically
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
        script.onload = () => {
            // marked.js is now loaded and available as 'marked'
            console.log('Marked.js loaded.');
        };
        document.head.appendChild(script);

        // Close modals when clicking outside
        window.onclick = function (event) {
            const mainGuideModal = document.getElementById('mainGuideModal');
            const shortlistModal = document.getElementById('shortlistModal');
            const stepModal = document.getElementById('stepModal');
            const commitMessageGeneratorModal = document.getElementById('commitMessageGeneratorModal');
            const commandExplainerModal = document.getElementById('commandExplainerModal');

            // Close the main guide modal if clicked outside its content
            if (event.target === mainGuideModal) {
                closeMainGuideModal();
            }
            // Close internal modals if clicked outside their content (and main modal is active)
            if (event.target === shortlistModal) {
                closeModal();
            }
            if (event.target === stepModal) {
                closeStepModal();
            }
            if (event.target === commitMessageGeneratorModal) {
                closeAIGeneratorModal();
            }
            if (event.target === commandExplainerModal) {
                closeAIExplainerModal();
            }
        }

        // Copy to clipboard function (using document.execCommand for iFrame compatibility)
        function copyToClipboard(elementId) {
            const inputElement = document.getElementById(elementId);

            // Create a temporary textarea element to hold the text to copy
            const tempTextArea = document.createElement('textarea');
            tempTextArea.value = inputElement.value;
            document.body.appendChild(tempTextArea); // Append to body so it's selectable

            // Select the text in the temporary textarea
            tempTextArea.select();
            tempTextArea.setSelectionRange(0, 99999); // For mobile devices

            try {
                // Execute the copy command
                document.execCommand('copy');
                // Optional: Provide visual feedback to the user
                const originalText = inputElement.value;
                inputElement.value = "Copied!";
                setTimeout(() => {
                    inputElement.value = originalText;
                }, 1000); // Revert text after 1 second
            } catch (err) {
                console.error('Failed to copy text: ', err);
                // Fallback for browsers where execCommand is not supported or fails
                // Using a custom message box is preferred over alert()
                const messageBox = document.createElement('div');
                messageBox.textContent = 'Could not copy text automatically. Please manually select and copy.';
                messageBox.style.cssText = `
            position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
            background-color: #f44336; color: white; padding: 15px; border-radius: 8px;
            z-index: 9999; font-family: sans-serif;
        `;
                document.body.appendChild(messageBox);
                setTimeout(() => {
                    document.body.removeChild(messageBox);
                }, 3000);
            } finally {
                // Remove the temporary textarea
                document.body.removeChild(tempTextArea);
            }
        }

        // Initialize with default system selection (Windows) when the DOM is ready
        document.addEventListener('DOMContentLoaded', () => {
            // Ensure the Windows tab is active on load for the step modal
            switchCommandSystem('windows'); // This will set the default tab state correctly
        });
    