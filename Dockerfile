# Dockerfile for AiONIQ dev environment (Node 18, pnpm)
FROM node:18-bullseye

# Create app dir and non-root user
ARG USER=dev
RUN useradd -ms /bin/bash $USER
USER $USER
ENV HOME=/home/$USER
WORKDIR /home/$USER/app

# Install pnpm globally
RUN npm install -g pnpm@10.23.0

# Configure pnpm store inside user's home (mounted volume)
ENV PNPM_STORE_PATH=/home/$USER/.pnpm-store
RUN mkdir -p $PNPM_STORE_PATH

# Copy package lock and package.json to leverage layer caching (if present)
COPY --chown=$USER:$USER package.json pnpm-lock.yaml* ./ || true

# Install dependencies (fetch only to populate store; full install will be in container runtime)
RUN pnpm fetch || true

# Copy project files
COPY --chown=$USER:$USER . .

# Expose dev port
EXPOSE 3000

# Default command: run the project start script (use dev-start.sh for consistent startup)
CMD ["bash", "./scripts/dev-start.sh"]

