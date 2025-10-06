# Contributing to SkyMirror

Thank you for your interest in contributing to SkyMirror! 🌍✨

## Code of Conduct

Be respectful, inclusive, and constructive. We're all here to make Earth observation data more accessible.

## How to Contribute

### Reporting Bugs

1. Check if the issue already exists in [GitHub Issues](https://github.com/yourusername/skymirror/issues)
2. Create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser/OS information
   - Screenshots if applicable

### Suggesting Features

1. Check [Discussions](https://github.com/yourusername/skymirror/discussions) first
2. Open an issue tagged `enhancement` with:
   - Use case description
   - Proposed solution
   - Alternative solutions considered
   - Impact on existing features

### Pull Requests

1. **Fork** the repository
2. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**:
   - Follow existing code style
   - Add comments for complex logic
   - Update README if needed
4. **Test thoroughly**:
   - Manual testing on desktop/mobile
   - Check accessibility features
   - Verify offline functionality
5. **Commit with clear messages**:
   ```bash
   git commit -m "feat: add aurora forecast overlay"
   ```
6. **Push and create PR**:
   ```bash
   git push origin feature/amazing-feature
   ```

### Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, no logic change)
- `refactor:` Code refactoring
- `test:` Adding/updating tests
- `chore:` Build process, dependencies

## Development Setup

```bash
# Clone your fork
git clone https://github.com/yourusername/skymirror.git
cd skymirror

# Install dependencies
npm install

# Start dev server
npm run dev

# Open http://localhost:3000
```

## Code Style Guidelines

### JavaScript
- Use ES6+ features (async/await, arrow functions)
- No external frameworks unless absolutely necessary
- Keep bundle size small (<150KB gzipped)
- Comment complex algorithms
- Use descriptive variable names

### CSS
- Use CSS custom properties for theming
- Mobile-first responsive design
- Follow existing naming conventions
- Avoid `!important` unless necessary
- Use semantic class names

### HTML
- Semantic HTML5 elements
- ARIA labels for accessibility
- Progressive enhancement approach

## Testing

Before submitting a PR, ensure:

- [ ] App loads without errors
- [ ] Map tiles display correctly
- [ ] Time slider updates imagery
- [ ] Layer switching works
- [ ] Settings persist
- [ ] High contrast mode functional
- [ ] Works on mobile (iOS/Android)
- [ ] Works offline after initial load
- [ ] No console errors

## Areas We Need Help

- **Accessibility**: Screen reader testing, keyboard navigation improvements
- **Design**: Icon design, splash screens, social sharing cards
- **Data Science**: Better atmosphere mood detection algorithms
- **Education**: Content for "Sky Stories" educational features
- **Localization**: Translations into other languages
- **Documentation**: Tutorials, video guides, API docs

## Questions?

- **General questions**: [GitHub Discussions](https://github.com/yourusername/skymirror/discussions)
- **Bug reports**: [GitHub Issues](https://github.com/yourusername/skymirror/issues)
- **Security concerns**: Email security@example.com

## License

By contributing, you agree that your contributions will be licensed under the Apache License 2.0.

---

Thank you for making SkyMirror better! 🙏

