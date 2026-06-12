$htmlPath = "d:\mukromka.github.io\portfolio_pdf_generator.html"
$pdfPath = "d:\mukromka.github.io\MukromKaruniaAzza_Portofolio_Academy.pdf"

$browserCandidates = @(
    "C:\Program Files\Google\Chrome\Application\chrome.exe",
    "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    "C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
)

$browserPath = $browserCandidates | Where-Object { Test-Path $_ } | Select-Object -First 1

if (-not $browserPath) {
    Write-Error "Chrome or Microsoft Edge was not found."
    exit 1
}

Write-Host "Generating PDF using $browserPath..."

$args = @(
    "--headless",
    "--disable-gpu",
    "--allow-file-access-from-files",
    "--print-to-pdf-no-header",
    "--print-to-pdf=$pdfPath",
    "file:///$($htmlPath -replace '\\', '/')"
)

& $browserPath $args

if (Test-Path $pdfPath) {
    Write-Host "Success! PDF generated at $pdfPath"
} else {
    Write-Error "Failed to generate PDF. File not found at $pdfPath"
    exit 1
}
