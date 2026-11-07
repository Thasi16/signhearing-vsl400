"""Vercel entrypoint using the same handler as the local preview."""

from serve import Handler


class handler(Handler):
    """Expose the existing routes, assets and VI/EN rendering to Vercel."""

