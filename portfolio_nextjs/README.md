# Portfolio UI — yerel API ayarları

Veriler Node.js/Express API üzerinden alınır; Firestore bağlantısını backend yönetir.

- Yerel API adresi: `http://localhost:5040/api`.
- `.env.example` dosyasını `.env.development.local` adıyla kopyalayın; farklı port için `NEXT_PUBLIC_API_URL` değerini değiştirin.
- `npm run dev` geliştirme ortamını otomatik seçer; `NODE_ENV` değerini elle tanımlamayın.
- `npm run build` ve `npm run start` production ortamını kullanır. `.env.development.local` production ortamında yüklenmez.
- Production varsayılan API adresi `https://portfolio-m5zz.onrender.com/api`; dağıtım ortamında `NEXT_PUBLIC_API_URL` ile değiştirilebilir.
- API adresi değiştiğinde geliştirme sunucusunu yeniden başlatın; production için yeniden derleyin. Ortak `.env.local` dosyasındaki ayarlar varsayılan adresi geçersiz kılabilir.
- Geliştirmede ziyaretçi verileri önbelleğe alınmaz. Firestore `id` alanı ortak veri katmanında bileşenlerin kullandığı `_id` alanına uyarlanır.

Görev takibi: `UI-ROADMAP.md`.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
