// --- Tab functionality for the main sections (Workflow, Commands, Automation, Pro Tips) ---
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

// --- Theme Toggle Functionality ---
// Toggles the 'data-theme' attribute on the <html> element
function toggleTheme() {
    const rootElement = document.documentElement; // Target the root HTML element
    const currentTheme = rootElement.getAttribute('data-theme');

    if (currentTheme === 'light') {
        rootElement.removeAttribute('data-theme'); // Revert to default (dark)
        localStorage.setItem('theme', 'dark'); // Save preference
    } else {
        rootElement.setAttribute('data-theme', 'light'); // Apply light theme
        localStorage.setItem('theme', 'light'); // Save preference
    }
}

// --- Main Guide Modal Functionality (the overarching modal that contains everything) ---
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

// --- Shortlist Modal Functionality (internal modal) ---
function openModal() {
    document.getElementById('shortlistModal').classList.add('active');
}

function closeModal() {
    document.getElementById('shortlistModal').classList.remove('active');
}

// --- Step-by-Step Modal Functionality (internal modal for specific command explanations) ---
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

// --- AI Feature Modal Functions ---
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

// --- NEW Guide Modals Data (content moved from HTML) ---
const guideContentData = {
    'newRepoSetup': {
        title: 'New Repository Setup Guide',
        description: 'A step-by-step guide to setting up a new Git repository and pushing your first code to GitHub.',
        html: `
            <div class="setup-scenario">
                <h3>Scenario: Starting a Brand New Project</h3>
                <ol class="step-list">
                    <li>
                        <p><strong>Create Your Project Folder & Navigate Into It:</strong></p>
                        <div class="code-block-wrapper">
                            <pre><code class="language-bash"># For Windows (CMD/PowerShell)
mkdir YourNewProject
cd YourNewProject

# For Mac/Linux/Git Bash
mkdir YourNewProject
cd YourNewProject
</code></pre>
                            <button class="copy-button">Copy</button>
                        </div>
                        <p class="note">Choose one set of commands based on your operating system. Replace <code>YourNewProject</code> with your actual project name.</p>
                    </li>
                    <li>
                        <p><strong>Initialize Git:</strong></p>
                        <div class="code-block-wrapper">
                            <pre><code class="language-bash">git init</code></pre>
                            <button class="copy-button">Copy</button>
                        </div>
                        <p class="note">This creates a hidden <code>.git</code> folder, marking your directory as a Git repository.</p>
                    </li>
                    <li>
                        <p><strong>Create Your First File (e.g., README.md):</strong></p>
                        <div class="code-block-wrapper">
                            <pre><code class="language-bash"># For Windows (PowerShell)
New-Item README.md -ItemType File

# For Mac/Linux/Git Bash
touch README.md
</code></pre>
                            <button class="copy-button">Copy</button>
                        </div>
                        <p class="note">A <code>README.md</code> is a good place to describe your project.</p>
                    </li>
                    <li>
                        <p><strong>Stage Your Changes:</strong></p>
                        <div class="code-block-wrapper">
                            <pre><code class="language-bash">git add .</code></pre>
                            <button class="copy-button">Copy</button>
                        </div>
                        <p class="note">The <code>.</code> stages all new and modified files in the current directory and subdirectories. If you only want specific files, replace <code>.</code> with the file path (e.g., <code>git add README.md</code>).</p>
                    </li>
                    <li>
                        <p><strong>Make Your First Commit:</strong></p>
                        <div class="code-block-wrapper">
                            <pre><code class="language-bash">git commit -m "Initial commit of new project"</code></pre>
                            <button class="copy-button">Copy</button>
                        </div>
                        <p class="note">A commit is a snapshot of your staged changes. The message should be clear and descriptive.</p>
                    </li>
                    <li>
                        <p><strong>Create Remote Repository on GitHub:</strong></p>
                        <ol>
                            <li>Go to <a href="https://github.com/new" target="_blank" style="color: var(--accent-color);">github.com/new</a>.</li>
                            <li>Give it the <strong>same name</strong> as your local project (e.g., <code>YourNewProject</code>).</li>
                            <li><strong>IMPORTANT:</strong> Do NOT check "Add a README file" or "Add .gitignore". You already have local files.</li>
                            <li>Click "Create repository".</li>
                            <li>On the next page, copy the HTTPS URL (e.g., <code>https://github.com/YOUR_USERNAME/YourNewProject.git</code>).</li>
                        </ol>
                    </li>
                    <li>
                        <p><strong>Link Local to Remote:</strong></p>
                        <div class="code-block-wrapper">
                            <pre><code class="language-bash">git remote add origin https://github.com/YOUR_USERNAME/YourNewProject.git</code></pre>
                            <button class="copy-button">Copy</button>
                        </div>
                        <p class="note">Replace the URL with the one you copied from GitHub. This command connects your local repository to the remote one.</p>
                    </li>
                    <li>
                        <p><strong>Push Your First Commit to GitHub:</strong></p>
                        <div class="code-block-wrapper">
                            <pre><code class="language-bash">git push -u origin main</code></pre>
                            <button class="copy-button">Copy</button>
                        </div>
                        <p class="note"><code>-u origin main</code> sets up your local <code>main</code> branch to track the remote <code>origin/main</code>. For subsequent pushes on this branch, you can simply use <code>git push</code>.</p>
                    </li>
                </ol>
                <p class="tip">You've successfully set up your new project and pushed it to GitHub!</p>
            </div>
        `
    },
    'gitTroubleshooting': {
        title: 'Git Troubleshooting Guide',
        description: 'Common Git issues and how to resolve them.',
        html: `
            <div class="troubleshooting-scenario">
                <h3>Issue: "fatal: remote origin already exists."</h3>
                <p><strong>Reason:</strong> You're trying to add a remote named 'origin' when one already exists (e.g., if you cloned a repo or already ran <code>git remote add origin</code>).</p>
                <p><strong>Solution 1: Remove existing remote and re-add (if it's incorrect):</strong></p>
                <div class="code-block-wrapper">
                    <pre><code class="language-bash">git remote remove origin
git remote add origin &lt;YOUR_NEW_REPO_URL&gt;
</code></pre>
                    <button class="copy-button">Copy</button>
                </div>
                <p class="note">Use <code>git remote -v</code> to see existing remotes first.</p>
                <p><strong>Solution 2: Add with a different name:</strong></p>
                <div class="code-block-wrapper">
                    <pre><code class="language-bash">git remote add upstream &lt;YOUR_NEW_REPO_URL&gt;</code></pre>
                    <button class="copy-button">Copy</button>
                </div>
                <p class="note">This adds a remote named 'upstream' instead of 'origin'.</p>
            </div>

            <div class="troubleshooting-scenario">
                <h3>Issue: "error: failed to push some refs to..." (Non-fast-forward updates)</h3>
                <p><strong>Reason:</strong> Your local branch is behind the remote branch. Someone else pushed changes that you don't have locally.</p>
                <p><strong>Solution: Pull first, then push:</strong></p>
                <div class="code-block-wrapper">
                    <pre><code class="language-bash">git pull origin main
# Resolve any merge conflicts that arise
git push origin main
</code></pre>
                    <button class="copy-button">Copy</button>
                </div>
                <p class="warning">Always <code>git pull</code> before <code>git push</code> if you're not sure your local is up-to-date, especially when collaborating.</p>
            </div>

            <div class="troubleshooting-scenario">
                <h3>Issue: Accidental commit / Need to undo latest commit</h3>
                <p><strong>Solution 1: Soft reset (undo commit, keep changes staged):</strong></p>
                <div class="code-block-wrapper">
                    <pre><code class="language-bash">git reset --soft HEAD~1</code></pre>
                    <button class="copy-button">Copy</button>
                </div>
                <p class="note">This moves HEAD back one commit, but keeps your files and staged changes.</p>
                <p><strong>Solution 2: Mixed reset (undo commit, keep changes unstaged):</strong></p>
                <div class="code-block-wrapper">
                    <pre><code class="language-bash">git reset HEAD~1</code></pre>
                    <button class="copy-button">Copy</button>
                </div>
                <p class="note">This is the default <code>git reset</code>. It undoes the commit and unstages changes, but keeps your files. You'll need to <code>git add</code> and <code>git commit</code> again.</p>
                <p><strong>Solution 3: Hard reset (undo commit and discard changes):</strong></p>
                <div class="code-block-wrapper">
                    <pre><code class="language-bash">git reset --hard HEAD~1</code></pre>
                    <button class="copy-button">Copy</button>
                </div>
                <p class="warning"><strong>USE WITH CAUTION!</strong> This discards all changes and commits back to the specified point. Lost changes are very difficult to recover. Only use if you are certain you want to permanently discard work.</p>
            </div>

            <div class="troubleshooting-scenario">
                <h3>Issue: Merge conflict</h3>
                <p><strong>Reason:</strong> Git can't automatically combine changes from two different branches in the same line(s) of code.</p>
                <ol class="step-list">
                    <li>
                        <p><strong>Identify the conflicts:</strong></p>
                        <div class="code-block-wrapper">
                            <pre><code class="language-bash">git status</code></pre>
                            <button class="copy-button">Copy</button>
                        </div>
                        <p class="note">This will list the files with merge conflicts. Open these files in your code editor.</p>
                    </li>
                    <li>
                        <p><strong>Manually resolve conflicts:</strong></p>
                        <p>You'll see conflict markers like <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code>, <code>=======</code>, <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code>. Edit the file to keep the desired code and remove the markers.</p>
                    </li>
                    <li>
                        <p><strong>Stage the resolved file:</strong></p>
                        <div class="code-block-wrapper">
                            <pre><code class="language-bash">git add &lt;conflicted_file_name&gt;</code></pre>
                            <button class="copy-button">Copy</button>
                        </div>
                        <p class="note">After resolving, tell Git the file is ready.</p>
                    </li>
                    <li>
                        <p><strong>Complete the merge commit:</strong></p>
                        <div class="code-block-wrapper">
                            <pre><code class="language-bash">git commit</code></pre>
                            <button class="copy-button">Copy</button>
                        </div>
                        <p class="note">Git will open your default editor with a pre-filled merge commit message. Save and close to complete.</p>
                    </li>
                </ol>
            </div>
        `
    }
};

// --- Scenarios Modal Functions (to contain links to New Repo Setup and Troubleshooting guides) ---
function openScenariosModal() {
    document.getElementById('scenariosModal').classList.remove('hidden'); // Ensure it's visible
    document.getElementById('scenariosModal').classList.add('active');
}

function closeScenariosModal() {
    document.getElementById('scenariosModal').classList.remove('active');
    document.getElementById('scenariosModal').classList.add('hidden'); // Hide it again
}

// --- Specific Guide Modals Functionality (full-page guides, triggered from Scenarios Modal) ---
function openNewRepoSetupGuideModal() {
    const modalElement = document.getElementById('newRepoSetupGuideModal');
    const contentContainer = modalElement.querySelector('.container'); // Get the container for content

    // Clear previous content and load new content
    contentContainer.innerHTML = `
        <h2 class="modal-title">${guideContentData.newRepoSetup.title}</h2>
        <p class="text-center opacity-80 mb-6">${guideContentData.newRepoSetup.description}</p>
        ${guideContentData.newRepoSetup.html}
    `;

    modalElement.classList.remove('hidden');
    modalElement.classList.add('active');
    attachCopyButtonsToDynamicallyLoadedContent(contentContainer); // Re-attach copy buttons
}

function closeNewRepoSetupGuideModal() {
    document.getElementById('newRepoSetupGuideModal').classList.remove('active');
    document.getElementById('newRepoSetupGuideModal').classList.add('hidden'); // Add hidden class back
}

function openGitTroubleshootingGuideModal() {
    const modalElement = document.getElementById('gitTroubleshootingGuideModal');
    const contentContainer = modalElement.querySelector('.container'); // Get the container for content

    // Clear previous content and load new content
    contentContainer.innerHTML = `
        <h2 class="modal-title">${guideContentData.gitTroubleshooting.title}</h2>
        <p class="text-center opacity-80 mb-6">${guideContentData.gitTroubleshooting.description}</p>
        ${guideContentData.gitTroubleshooting.html}
    `;

    modalElement.classList.remove('hidden');
    modalElement.classList.add('active');
    attachCopyButtonsToDynamicallyLoadedContent(contentContainer); // Re-attach copy buttons
}

function closeGitTroubleshootingGuideModal() {
    document.getElementById('gitTroubleshootingGuideModal').classList.remove('active');
    document.getElementById('gitTroubleshootingGuideModal').classList.add('hidden'); // Add hidden class back
}

// --- GitHub Integration Modal Functions ---
function openGitHubIntegrationModal() {
    document.getElementById('gitHubIntegrationModal').classList.add('active');
    // Clear previous content
    document.getElementById('githubRepoUrlInput').value = '';
    document.getElementById('githubCommitsOutput').innerHTML = 'Enter a GitHub repository URL (e.g., <code>https://github.com/octocat/Spoon-Knife</code>) and click "Fetch Commits".';
}

function closeGitHubIntegrationModal() {
    document.getElementById('gitHubIntegrationModal').classList.remove('active');
}

// --- GitHub API Integration Function ---
async function fetchGitHubCommits() {
    const repoUrlInput = document.getElementById('githubRepoUrlInput');
    const commitsOutput = document.getElementById('githubCommitsOutput');
    const loadingIndicator = document.getElementById('loadingIndicatorGithub');

    const repoUrl = repoUrlInput.value.trim();
    if (!repoUrl) {
        commitsOutput.innerHTML = '<p class="text-red-400">Please enter a GitHub repository URL.</p>';
        return;
    }

    // Extract owner and repo name from the URL
    const githubRegex = /github\.com\/([^\/]+)\/([^\/]+)(?:\.git)?/;
    const match = repoUrl.match(githubRegex);

    if (!match || match.length < 3) {
        commitsOutput.innerHTML = '<p class="text-red-400">Invalid GitHub URL format. Please use a format like <code>https://github.com/owner/repo</code>.</p>';
        return;
    }

    const owner = match[1];
    const repo = match[2];

    loadingIndicator.style.display = 'flex';
    commitsOutput.innerHTML = ''; // Clear previous output

    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/commits`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            if (response.status === 404) {
                commitsOutput.innerHTML = `<p class="text-red-400">Repository not found: <code>${owner}/${repo}</code>. Please check the URL.</p>`;
            } else if (response.status === 403) {
                commitsOutput.innerHTML = `<p class="text-red-400">API Rate Limit Exceeded or Access Denied. Please try again later or use a personal access token for higher limits.</p>`;
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return;
        }

        const commits = await response.json();

        if (commits.length === 0) {
            commitsOutput.innerHTML = '<p class="text-yellow-400">No commits found for this repository.</p>';
        } else {
            let commitsHtml = '<h4 class="text-lg font-semibold text-accent-color mb-3">Recent Commits:</h4><ul>';
            commits.slice(0, 5).forEach(commit => { // Display up to 5 recent commits
                const sha = commit.sha.substring(0, 7);
                const message = commit.commit.message.split('\n')[0]; // Get first line of message
                const author = commit.commit.author ? commit.commit.author.name : 'Unknown';
                const date = new Date(commit.commit.author.date).toLocaleDateString();
                const commitUrl = commit.html_url;

                commitsHtml += `
                    <li class="mb-2 p-2 rounded-lg bg-transparent-dark-glass border border-border-color">
                        <a href="${commitUrl}" target="_blank" class="text-accent-color hover:underline font-mono text-sm">${sha}</a>
                        <span class="text-gray-400 text-xs ml-2">(${date})</span>
                        <p class="text-text-color text-sm">${message}</p>
                        <p class="text-gray-500 text-xs">by ${author}</p>
                    </li>
                `;
            });
            commitsHtml += '</ul>';
            commitsOutput.innerHTML = commitsHtml;
        }

    } catch (error) {
        commitsOutput.innerHTML = `<p class="text-red-400">Error fetching commits: ${error.message}</p>`;
        console.error("Error fetching GitHub commits:", error);
    } finally {
        loadingIndicator.style.display = 'none';
    }
}

// --- Gemini API Integration Functions ---
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
// Load marked.js library dynamically. This ensures it's available for parsing AI responses.
const markedScript = document.createElement('script');
markedScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/marked/4.0.0/marked.min.js';
markedScript.onload = () => {
    // marked.js is now loaded and available as 'marked'
    console.log('Marked.js loaded.');
};
document.head.appendChild(markedScript);


// --- Global Copy to clipboard function (using document.execCommand for iFrame compatibility) ---
// This function handles copying text from either an input element (by ID) or a code element (by direct reference).
function copyToClipboard(elementOrId) {
    let element;
    if (typeof elementOrId === 'string') {
        // If an ID is passed, get the element by ID (e.g., from an input field)
        element = document.getElementById(elementOrId);
    } else {
        // If the element itself is passed (e.g., a <code> element)
        element = elementOrId;
    }

    if (!element) {
        console.error("Element not found for copy operation:", elementOrId);
        return;
    }

    let textToCopy;
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        textToCopy = element.value;
    } else if (element.tagName === 'CODE') {
        textToCopy = element.innerText;
    } else if (element.tagName === 'PRE') { // Fallback if a pre tag is passed directly, try to find code inside
        textToCopy = element.querySelector('code') ? element.querySelector('code').innerText : element.innerText;
    } else {
        console.error("Unsupported element type for copy:", element.tagName);
        return;
    }

    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = textToCopy;
    document.body.appendChild(tempTextArea); // Append to body so it's selectable

    tempTextArea.select();
    tempTextArea.setSelectionRange(0, 99999); // For mobile devices

    try {
        document.execCommand('copy');
        // Provide visual feedback by temporarily changing the copy button text
        let copyButton;
        // Try to find the associated copy button based on context
        if (element.closest('.code-block-wrapper')) { // For buttons inside new guide modals
            copyButton = element.closest('.code-block-wrapper').querySelector('.copy-button');
        } else if (element.closest('.command-block')) { // For buttons in step modal
            copyButton = element.closest('.command-block').querySelector('.copy-button');
        } else if (element.closest('.code-line')) { // For buttons in main commands table
            copyButton = element.closest('.code-line').querySelector('.copy-btn');
        } else if (element.id === 'commitMessageOutput' || element.id === 'gitCommandExplanationOutput' || element.id === 'githubCommitsOutput') { // For AI and GitHub output copy buttons
            copyButton = element.nextElementSibling; // Assuming copy button is next sibling
        }

        if (copyButton) {
            const originalText = copyButton.innerText;
            copyButton.innerText = "Copied!";
            setTimeout(() => {
                copyButton.innerText = originalText;
            }, 1000); // Revert text after 1 second
        }
    } catch (err) {
        console.error('Failed to copy text: ', err);
        // Fallback: Display a temporary message box instead of alert()
        const messageBox = document.createElement('div');
        messageBox.textContent = 'Could not copy text automatically. Please manually select and copy.';
        messageBox.style.cssText = `
            position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
            background-color: #f44336; color: white; padding: 15px; border-radius: 8px;
            z-index: 9999; font-family: sans-serif; text-align: center;
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

// Function to attach copy buttons to dynamically loaded content
function attachCopyButtonsToDynamicallyLoadedContent(containerElement) {
    containerElement.querySelectorAll('.code-block-wrapper').forEach(block => {
        // Ensure a copy button is only added once
        if (!block.querySelector('.copy-button.js-added')) {
            const copyBtn = document.createElement('button');
            copyBtn.classList.add('copy-button', 'js-added');
            copyBtn.innerText = 'Copy';

            copyBtn.style.position = 'absolute';
            copyBtn.style.top = 'var(--spacing-xs)'; // Use CSS variable
            copyBtn.style.right = 'var(--spacing-xs)'; // Use CSS variable
            block.appendChild(copyBtn);

            copyBtn.addEventListener('click', () => {
                const elementToCopy = block.querySelector('pre code') || block.querySelector('code');
                if (elementToCopy) {
                    copyToClipboard(elementToCopy);
                }
            });
        }
    });
}


// --- Event Listeners and Initializations ---
// Close modals when clicking outside their content
window.onclick = function (event) {
    const mainGuideModal = document.getElementById('mainGuideModal');
    const shortlistModal = document.getElementById('shortlistModal');
    const stepModal = document.getElementById('stepModal');
    const commitMessageGeneratorModal = document.getElementById('commitMessageGeneratorModal');
    const commandExplainerModal = document.getElementById('commandExplainerModal');
    const newRepoSetupGuideModal = document.getElementById('newRepoSetupGuideModal');
    const gitTroubleshootingGuideModal = document.getElementById('gitTroubleshootingGuideModal');
    const scenariosModal = document.getElementById('scenariosModal');
    const gitHubIntegrationModal = document.getElementById('gitHubIntegrationModal'); // NEW

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
    // New Guide Modals close conditions
    if (event.target === newRepoSetupGuideModal) {
        closeNewRepoSetupGuideModal();
    }
    if (event.target === gitTroubleshootingGuideModal) {
        closeGitTroubleshootingGuideModal();
    }
    // Scenarios Modal close condition
    if (event.target === scenariosModal) {
        closeScenariosModal();
    }
    // NEW: GitHub Integration Modal close condition
    if (event.target === gitHubIntegrationModal) {
        closeGitHubIntegrationModal();
    }
};

// Scroll to top button functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}


// Initialize on DOMContentLoaded to ensure elements are available
document.addEventListener('DOMContentLoaded', () => {
    // Apply theme preference from localStorage on load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    // Ensure the Windows tab is active on load for the step modal
    switchCommandSystem('windows'); // This will set the default tab state correctly

    // Attach copy buttons to all initial static code blocks (e.g., in Automation tab)
    document.querySelectorAll('.code-block-wrapper, .command-block').forEach(block => {
        // Only add a copy button if it doesn't already exist to prevent duplicates
        if (!block.querySelector('.copy-button.js-added') && !block.querySelector('.copy-button')) { // Check for both classes
            const copyBtn = document.createElement('button');
            copyBtn.classList.add('copy-button', 'js-added');
            copyBtn.innerText = 'Copy';

            if (block.classList.contains('code-block-wrapper')) {
                copyBtn.style.position = 'absolute';
                copyBtn.style.top = 'var(--spacing-xs)';
                copyBtn.style.right = 'var(--spacing-xs)';
            }
            block.appendChild(copyBtn);

            copyBtn.addEventListener('click', () => {
                let elementToCopy;
                if (block.classList.contains('command-block')) {
                    elementToCopy = block.querySelector('.command-input');
                } else {
                    elementToCopy = block.querySelector('pre code') || block.querySelector('code');
                }
                if (elementToCopy) {
                    copyToClipboard(elementToCopy);
                }
            });
        }
    });

    // Handle copy buttons in the commands table (.code-line)
    document.querySelectorAll('.command-table .code-line').forEach(line => {
        const preCode = line.querySelector('pre code');
        const copyBtn = line.querySelector('.copy-btn'); // Assuming copy-btn is already in HTML

        if (preCode && copyBtn && !copyBtn.dataset.listenerAttached) {
            copyBtn.addEventListener('click', () => {
                copyToClipboard(preCode);
            });
            copyBtn.dataset.listenerAttached = 'true'; // Mark as attached
        }
    });
});
