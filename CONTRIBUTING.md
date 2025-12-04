# Contributing to Visitor Form Application

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Maintain professionalism

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in Issues
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, Node version, etc.)

### Suggesting Features

1. Check if the feature has been suggested
2. Create a new issue with:
   - Clear description of the feature
   - Use cases
   - Potential implementation approach
   - Any relevant examples

### Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/visitor-form-app.git
   cd visitor-form-app
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Test your changes**
   ```bash
   # Backend tests
   cd backend && npm test
   
   # Frontend tests
   cd frontend && npm test
   ```

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add: Brief description of your changes"
   ```

   Commit message format:
   - `Add:` for new features
   - `Fix:` for bug fixes
   - `Update:` for updates to existing features
   - `Refactor:` for code refactoring
   - `Docs:` for documentation changes

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template
   - Wait for review

### Code Style Guidelines

#### JavaScript/React
- Use ES6+ syntax
- Use functional components with hooks
- Follow Airbnb JavaScript style guide
- Use meaningful variable names
- Keep functions small and focused
- Add PropTypes for React components

#### Backend
- Use async/await for asynchronous operations
- Handle errors properly
- Use parameterized queries for database operations
- Add input validation
- Write descriptive error messages

#### CSS
- Use meaningful class names
- Follow BEM naming convention when applicable
- Keep styles modular
- Use CSS variables for colors and common values

### Testing

- Write tests for new features
- Ensure all tests pass before submitting PR
- Aim for >80% code coverage
- Test edge cases

### Documentation

- Update README.md if adding features
- Add inline comments for complex code
- Update API documentation for new endpoints
- Include examples in documentation

## Development Setup

1. **Install dependencies**
   ```bash
   ./install.sh
   ```

2. **Configure environment**
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   # Edit .env files with your settings
   ```

3. **Start development servers**
   ```bash
   # Backend
   cd backend && npm run dev
   
   # Frontend (in new terminal)
   cd frontend && npm start
   ```

## Project Structure

```
new-react-app/
├── backend/          # Express API
├── frontend/         # React app
├── .github/          # GitHub Actions
├── docs/            # Documentation
└── docker-compose.yml
```

## Review Process

1. Automated checks must pass (tests, linting)
2. Code review by maintainers
3. Address review feedback
4. Approval and merge

## Questions?

Feel free to:
- Open an issue for questions
- Join discussions
- Reach out to maintainers

Thank you for contributing! 🎉
