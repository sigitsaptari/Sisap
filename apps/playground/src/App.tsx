import { useState } from "react";
import {
  Add,
  ArrowDown2,
  ArrowRight,
  Category,
  Clock,
  Export,
  Layer,
  Mobile,
  Moon,
  Receive,
  Send2,
  Setting4,
  Sun1,
  TickCircle,
  Wallet,
} from "iconsax-react";
import { Button, Checkbox, Chip, TextArea, TextField, Typography } from "@sisapds/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/LocalUi";

type ActiveTab = "ewallet" | "catalog" | "canvas";

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeTab, setActiveTab] = useState<ActiveTab>("ewallet");

  // Transfer prototype state
  const [recipient, setRecipient] = useState("081234567890");
  const [amount, setAmount] = useState("150000");
  const [note, setNote] = useState("Split bill makan siang 🍜");
  const [saveContact, setSaveContact] = useState(true);
  const [isTransferring, setIsTransferring] = useState(false);
  const [transferSuccess, setTransferSuccess] = useState(false);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;
  };

  const handleTransfer = () => {
    setIsTransferring(true);
    setTimeout(() => {
      setIsTransferring(false);
      setTransferSuccess(true);
    }, 900);
  };

  const quickAmounts = ["50000", "100000", "150000", "250000", "500000"];

  return (
    <div className="bg-bg-canvas text-fg-default min-h-screen transition-colors">
      {/* Top Navbar */}
      <header className="border-border-default bg-bg-surface/80 sticky top-0 z-(--ds-z-index-sticky) border-b backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="bg-action-primary text-fg-on-brand flex size-9 items-center justify-center rounded-lg font-bold shadow-sm">
              S
            </div>
            <div>
              <Typography variant="h4" className="text-base leading-none font-bold">
                SisapDS Playground
              </Typography>
              <Typography variant="muted" className="text-xs">
                Rapid prototyping & component sandbox
              </Typography>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View switcher navigation */}
            <nav className="border-border-default bg-bg-surface flex rounded-lg border p-1">
              <button
                type="button"
                onClick={() => setActiveTab("ewallet")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeTab === "ewallet"
                    ? "bg-action-primary text-fg-on-brand"
                    : "text-fg-muted hover:text-fg-default"
                }`}
              >
                <Mobile className="size-3.5" />
                <span>E-Wallet Prototype</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("catalog")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeTab === "catalog"
                    ? "bg-action-primary text-fg-on-brand"
                    : "text-fg-muted hover:text-fg-default"
                }`}
              >
                <Layer className="size-3.5" />
                <span>Components</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("canvas")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeTab === "canvas"
                    ? "bg-action-primary text-fg-on-brand"
                    : "text-fg-muted hover:text-fg-default"
                }`}
              >
                <Category className="size-3.5" />
                <span>Blank Canvas</span>
              </button>
            </nav>

            <Button
              variant="secondary"
              size="icon"
              aria-label="Toggle color theme"
              onClick={toggleTheme}
            >
              {theme === "light" ? <Moon className="size-4" /> : <Sun1 className="size-4" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* ========================================================= */}
        {/* TAB 1: E-WALLET TRANSFER PROTOTYPE                        */}
        {/* ========================================================= */}
        {activeTab === "ewallet" && (
          <div className="flex flex-col gap-8">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <Typography variant="h2">Kirim Uang (E-Wallet Transfer)</Typography>
                  <Typography variant="muted">
                    Prototipe alur transaksi instan menggunakan komponen Button, Card, Dialog,
                    TextField, dsb.
                  </Typography>
                </div>

                {/* Filter Drawer Trigger */}
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="outline" leftIcon={<Setting4 className="size-4" />}>
                      Pengaturan Akun & Limit
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent side="right">
                    <DrawerHeader>
                      <DrawerTitle>Pengaturan Transaksi</DrawerTitle>
                      <DrawerDescription>
                        Konfigurasi limit harian transfer dan notifikasi keamanan e-wallet.
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="flex flex-col gap-4 px-6 py-2">
                      <div className="space-y-1.5">
                        <label
                          htmlFor="daily-limit"
                          className="text-fg-default text-xs font-medium"
                        >
                          Limit Harian Transfer
                        </label>
                        <TextField id="daily-limit" defaultValue="Rp 25.000.000" />
                      </div>
                      <Checkbox
                        id="biometric-auth"
                        text="Wajib verifikasi biometrik / PIN"
                        defaultChecked
                      />
                      <Checkbox
                        id="instant-receipt"
                        text="Kirim e-receipt otomatis via WhatsApp"
                        defaultChecked
                      />
                    </div>
                    <DrawerFooter>
                      <DrawerClose asChild>
                        <Button variant="secondary">Tutup</Button>
                      </DrawerClose>
                      <DrawerClose asChild>
                        <Button>Simpan</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
              {/* Left Column: Transfer Form */}
              <div className="col-span-12 lg:col-span-7">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Send2 className="text-action-primary size-5" />
                        <CardTitle>Transfer Saldo</CardTitle>
                      </div>
                      <Chip color="tosca" type="soft" label="Bebas Biaya Admin" />
                    </div>
                    <CardDescription>
                      Kirim saldo ke sesama pengguna SisapPay atau rekening bank tanpa potongan.
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex flex-col gap-5">
                      {/* Recipient Field */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <label htmlFor="recipient-input" className="text-fg-default font-medium">
                            Nomor HP / Rekening Tujuan
                          </label>
                          <span className="text-fg-muted">Tersambung: Sigit Saptari</span>
                        </div>
                        <TextField
                          id="recipient-input"
                          type="tel"
                          value={recipient}
                          onChange={(e) => setRecipient(e.target.value)}
                          placeholder="Contoh: 081234567890"
                        />
                      </div>

                      {/* Nominal Field */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="amount-input"
                          className="text-fg-default text-xs font-medium"
                        >
                          Nominal Transfer (Rp)
                        </label>
                        <TextField
                          id="amount-input"
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="0"
                        />

                        {/* Quick amount chips */}
                        <div className="flex flex-wrap gap-2 pt-1">
                          {quickAmounts.map((q) => (
                            <button
                              key={q}
                              type="button"
                              onClick={() => setAmount(q)}
                              className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${
                                amount === q
                                  ? "border-action-primary bg-action-primary/10 text-action-primary"
                                  : "border-border-default bg-bg-surface hover:bg-action-ghost-hover text-fg-muted"
                              }`}
                            >
                              Rp {Number(q).toLocaleString("id-ID")}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Catatan Field */}
                      <TextArea
                        id="note-input"
                        label="Catatan Transfer"
                        description="Tambahkan pesan atau referensi pembayaran untuk penerima"
                        optional
                        showInfoTooltip
                        infoTooltip="Pesan ini akan terlihat di mutasi dan bukti transaksi penerima."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Tulis pesan..."
                        maxLength={200}
                        showCounter
                        hint="Maksimal 200 karakter"
                        size="md"
                      />

                      {/* Simpan kontak checkbox */}
                      <div className="pt-1">
                        <Checkbox
                          id="save-contact"
                          text="Simpan sebagai kontak favorit"
                          checked={saveContact}
                          onCheckedChange={(c) => setSaveContact(Boolean(c))}
                        />
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="border-border-default border-t pt-4">
                    {/* Confirmation Dialog */}
                    <Dialog open={transferSuccess ? true : undefined}>
                      <DialogTrigger asChild>
                        <Button
                          variant="primary"
                          className="w-full"
                          rightIcon={<ArrowRight className="size-4" />}
                          disabled={!amount || Number(amount) <= 0}
                        >
                          Lanjutkan Pembayaran
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        {transferSuccess ? (
                          <div className="py-4 text-center">
                            <TickCircle className="text-feedback-success mx-auto size-14" />
                            <DialogTitle className="mt-4 text-center">
                              Transfer Berhasil!
                            </DialogTitle>
                            <DialogDescription className="mt-1 text-center">
                              Saldo sebesar{" "}
                              <strong className="text-fg-default">
                                Rp {Number(amount).toLocaleString("id-ID")}
                              </strong>{" "}
                              telah berhasil dikirimkan ke {recipient}.
                            </DialogDescription>
                            <div className="mt-6 flex justify-center">
                              <DialogClose asChild>
                                <Button
                                  variant="primary"
                                  onClick={() => {
                                    setTransferSuccess(false);
                                    setAmount("");
                                  }}
                                >
                                  Selesai
                                </Button>
                              </DialogClose>
                            </div>
                          </div>
                        ) : (
                          <>
                            <DialogTitle>Konfirmasi Transfer Saldo</DialogTitle>
                            <DialogDescription>
                              Periksa kembali rincian transaksi sebelum memproses pengiriman saldo.
                            </DialogDescription>

                            <div className="border-border-default bg-bg-canvas space-y-2.5 rounded-lg border p-4 text-sm">
                              <div className="flex justify-between">
                                <span className="text-fg-muted">Tujuan:</span>
                                <span className="text-fg-default font-semibold">
                                  {recipient} (Sigit Saptari)
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-fg-muted">Nominal:</span>
                                <span className="text-fg-default font-semibold">
                                  Rp {Number(amount).toLocaleString("id-ID")}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-fg-muted">Biaya Admin:</span>
                                <span className="text-feedback-success font-medium">
                                  Gratis (Rp 0)
                                </span>
                              </div>
                              {note && (
                                <div className="border-border-default flex justify-between border-t pt-2">
                                  <span className="text-fg-muted">Catatan:</span>
                                  <span className="text-fg-default italic">"{note}"</span>
                                </div>
                              )}
                            </div>

                            <div className="mt-2 flex justify-end gap-3">
                              <DialogClose asChild>
                                <Button variant="secondary" disabled={isTransferring}>
                                  Batal
                                </Button>
                              </DialogClose>
                              <Button
                                variant="primary"
                                isLoading={isTransferring}
                                loadingText="Memproses..."
                                onClick={handleTransfer}
                              >
                                Konfirmasi & Kirim
                              </Button>
                            </div>
                          </>
                        )}
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              </div>

              {/* Right Column: Balance Card & Recent Transactions */}
              <div className="col-span-12 space-y-6 lg:col-span-5">
                {/* Active Wallet Card */}
                <Card className="border-action-primary/20 from-bg-surface to-bg-canvas bg-gradient-to-br">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Wallet className="text-action-primary size-4" />
                        <Typography variant="small" className="font-medium">
                          SisapPay Utama
                        </Typography>
                      </div>
                      <Chip color="green" type="soft" label="Aktif" />
                    </div>
                    <CardTitle className="mt-2 text-3xl font-extrabold tracking-tight">
                      Rp 4.850.000
                    </CardTitle>
                    <CardDescription>Nomor Akun: 0812-9988-7766</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex gap-2 pt-0">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="flex-1"
                      leftIcon={<Add className="size-3.5" />}
                    >
                      Top Up
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          rightIcon={<ArrowDown2 className="size-3.5" />}
                        >
                          Opsi
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Menu Saldo</DropdownMenuLabel>
                        <DropdownMenuItem>Mutasi Rekening</DropdownMenuItem>
                        <DropdownMenuItem>Tarik Tunai QR</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">Blokir Sementara</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardFooter>
                </Card>

                {/* Recent Activities Card */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="text-fg-muted size-4" />
                        <CardTitle className="text-base font-semibold">Riwayat Transaksi</CardTitle>
                      </div>
                      <Button variant="ghost" size="sm" className="text-xs">
                        Lihat Semua
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-col gap-3">
                      {[
                        {
                          name: "Coffee Shop Senopati",
                          amount: "-Rp 45.000",
                          type: "out",
                          date: "Hari ini, 13:20",
                        },
                        {
                          name: "Transfer dari Budi Santoso",
                          amount: "+Rp 500.000",
                          type: "in",
                          date: "Kemarin, 09:15",
                        },
                        {
                          name: "Langganan Sisap Pro Cloud",
                          amount: "-Rp 149.000",
                          type: "out",
                          date: "02 Okt 2026",
                        },
                      ].map((tx, idx) => (
                        <div
                          key={idx}
                          className="border-border-default flex items-center justify-between rounded-lg border p-3 text-sm"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex size-8 items-center justify-center rounded-full ${
                                tx.type === "in"
                                  ? "bg-feedback-success-bg text-feedback-success"
                                  : "bg-action-secondary text-fg-muted"
                              }`}
                            >
                              {tx.type === "in" ? (
                                <Receive className="size-4" />
                              ) : (
                                <Export className="size-4" />
                              )}
                            </div>
                            <div>
                              <p className="text-fg-default font-medium">{tx.name}</p>
                              <p className="text-fg-muted text-xs">{tx.date}</p>
                            </div>
                          </div>
                          <span
                            className={`font-semibold ${
                              tx.type === "in" ? "text-feedback-success" : "text-fg-default"
                            }`}
                          >
                            {tx.amount}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: FULL COMPONENT CATALOG & TOKEN INSPECTOR           */}
        {/* ========================================================= */}
        {activeTab === "catalog" && (
          <div className="flex flex-col gap-8">
            <div>
              <Typography variant="h2">Komponen & Token Catalog</Typography>
              <Typography variant="muted">
                Daftar semua komponen design system aktif beserta varian dan interaksinya.
              </Typography>
            </div>

            {/* Buttons */}
            <Card>
              <CardHeader>
                <CardTitle>1. Button</CardTitle>
                <CardDescription>
                  Mendukung varian, ukuran, status loading, dan ikon.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button isLoading loadingText="Saving…">
                    Loading
                  </Button>
                  <Button disabled>Disabled</Button>
                  <Button size="icon" aria-label="Add item">
                    <Add className="size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* TextFields & Checkboxes */}
            <Card>
              <CardHeader>
                <CardTitle>2. TextField & Checkbox</CardTitle>
                <CardDescription>
                  Form controls sesuai PaDi DS v3.0 — TextField dengan state dan Checkbox varian
                  ukuran.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <TextField label="TextField Standard" placeholder="Type here..." />
                  <TextField
                    label="TextField Error"
                    state="error"
                    errorMessage="Format tidak valid"
                    defaultValue="invalid-email"
                  />
                  <div className="space-y-2 pt-2">
                    <Checkbox id="c1" text="Checkbox Checked" defaultChecked />
                    <Checkbox id="c2" text="Checkbox Medium" size="md" />
                    <Checkbox id="c3" text="Checkbox Large" size="lg" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Chips & Typography */}
            <Card>
              <CardHeader>
                <CardTitle>3. Chip Indikator</CardTitle>
                <CardDescription>Chip status (Figma 91105:6246).</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Chip color="tosca" type="soft" label="Tosca Soft" showIconR />
                    <Chip color="green" type="outline" label="Green Outline" showIconR />
                    <Chip color="red" type="solid" label="Red Solid" showIconR />
                    <Chip color="orange" type="soft" label="Orange Soft" />
                    <Chip color="blue" type="soft" label="Blue Soft" />
                    <Chip color="grey" type="outline" label="Grey Outline" />
                  </div>
                  <div className="border-border-default space-y-1 border-t pt-3">
                    <Typography variant="h3">Heading 3 Tipografi</Typography>
                    <Typography variant="body">
                      Paragraf body teks yang menggunakan token semantik.
                    </Typography>
                    <Typography variant="code">npm run tokens:build</Typography>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* TextArea Component Showcase */}
            <Card>
              <CardHeader>
                <CardTitle>4. Text Area (Figma 92211:8704)</CardTitle>
                <CardDescription>
                  Komponen Text Area multiline input sesuai PaDi DS v3.0 — sizes (sm, md, lg),
                  states (default, focussed, error, success, disabled), karakter counter, dan status
                  caption.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  {/* Size: sm */}
                  <div className="border-border-default space-y-4 rounded-lg border p-4">
                    <span className="text-action-primary text-xs font-semibold tracking-wider uppercase">
                      Size Small (sm)
                    </span>
                    <TextArea
                      size="sm"
                      label="Deskripsi Singkat"
                      description="Format ringkas (text 12px)"
                      placeholder="Masukkan catatan ringkas..."
                      required
                      showInfoTooltip
                      hint="Petunjuk teks"
                      showCounter
                      maxLength={100}
                    />
                    <TextArea
                      size="sm"
                      label="Status Sukses"
                      defaultValue="Spesifikasi telah memenuhi syarat"
                      state="success"
                      successMessage="Information"
                      showCounter
                      counterText="35/100"
                    />
                  </div>

                  {/* Size: md */}
                  <div className="border-border-default space-y-4 rounded-lg border p-4">
                    <span className="text-action-primary text-xs font-semibold tracking-wider uppercase">
                      Size Medium (md) — Default
                    </span>
                    <TextArea
                      size="md"
                      label="Catatan Pengadaan"
                      description="Ukuran standar formulir PaDi"
                      placeholder="Tuliskan catatan atau instruksi tender..."
                      required
                      optional
                      showInfoTooltip
                      infoTooltip="Petunjuk pengisian spesifikasi tender"
                      hint="Hint Text"
                      showCounter
                      counterText="0/200"
                    />
                    <TextArea
                      size="md"
                      label="Status Error"
                      defaultValue="Format salah"
                      state="error"
                      errorMessage="Information"
                      showCounter
                      counterText="12/200"
                    />
                  </div>

                  {/* Size: lg */}
                  <div className="border-border-default space-y-4 rounded-lg border p-4">
                    <span className="text-action-primary text-xs font-semibold tracking-wider uppercase">
                      Size Large (lg)
                    </span>
                    <TextArea
                      size="lg"
                      label="Spesifikasi Lengkap"
                      description="Ukuran luas untuk detail dokumen"
                      placeholder="Jelaskan kebutuhan secara mendalam..."
                      optional
                      showInfoTooltip
                      hint="Hint Text"
                      showCounter
                      counterText="0/500"
                    />
                    <TextArea
                      size="lg"
                      label="Status Nonaktif (Disabled)"
                      disabled
                      defaultValue="Bagian ini terkunci untuk pengeditan umum."
                      hint="Hint Text"
                      showCounter
                      counterText="43/500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: BLANK CANVAS FOR INSTANT PROTOTYPING               */}
        {/* ========================================================= */}
        {activeTab === "canvas" && (
          <Card className="min-h-[400px] border-dashed">
            <CardContent className="flex flex-col items-center justify-center p-12 text-center">
              <div className="bg-action-secondary text-fg-muted flex size-14 items-center justify-center rounded-full">
                <Category className="size-7" />
              </div>
              <Typography variant="h3" className="mt-4">
                Blank Prototyping Canvas
              </Typography>
              <Typography variant="muted" className="mt-1 max-w-md">
                Area siap pakai untuk membuat tampilan prototipe baru. Mintalah Gemini:{" "}
                <em className="text-fg-default">
                  "Buat halaman analitik / settings di canvas playground."
                </em>
              </Typography>
              <div className="mt-6 flex gap-3">
                <Button variant="primary" leftIcon={<Add className="size-4" />}>
                  Tambah Komponen
                </Button>
                <Button variant="secondary">Dokumentasi</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
