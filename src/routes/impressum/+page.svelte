<script>
	import HeaderSection from '$lib/page/HeaderSection.svelte';
	import PageContent from '$lib/page/PageContent.svelte';
</script>

<svelte:head>
	<title>Impressum | Ben</title>
</svelte:head>

<HeaderSection title="Impressum" />

<PageContent>
	<section>
		<h2 class="title-gradient text-2xl font-black tracking-[-0.02em] uppercase sm:text-3xl">
			Angaben gemäß § 5 TMG
		</h2>
		<p class="mt-4 leading-relaxed">
			Ben Schiemann<br />
			Reinbeker Weg 70<br />
			21465 Wentorf
		</p>
	</section>

	<section>
		<h2 class="title-gradient text-2xl font-black tracking-[-0.02em] uppercase sm:text-3xl">
			Kontakt
		</h2>
		<p class="mt-4 leading-relaxed">
			Telefon:
			<a
				class="underline decoration-electric-400/60 hover:decoration-electric-400"
				href="tel:+4915164877269">+49 1516 4877269</a
			><br />
			E-Mail:
			<a
				class="underline decoration-electric-400/60 hover:decoration-electric-400"
				href="mailto:ben@schiemann.work">ben@schiemann.work</a
			>
		</p>
	</section>

	<section>
		<h2 class="title-gradient text-2xl font-black tracking-[-0.02em] uppercase sm:text-3xl">
			Redaktionell verantwortlich
		</h2>
		<p class="mt-4 leading-relaxed">
			Ben Schiemann<br />
			Reinbeker Weg 70<br />
			21465 Wentorf
		</p>
	</section>

	<section>
		<h2 class="title-gradient text-2xl font-black tracking-[-0.02em] uppercase sm:text-3xl">
			EU-Streitschlichtung
		</h2>
		<p class="mt-4 leading-relaxed">
			Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
			<a
				class="underline decoration-electric-400/60 hover:decoration-electric-400"
				href="https://ec.europa.eu/consumers/odr/"
				target="_blank"
				rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a
			>.<br />
			Unsere E-Mail-Adresse finden Sie oben im Impressum.
		</p>
	</section>

	<section>
		<h2 class="title-gradient text-2xl font-black tracking-[-0.02em] uppercase sm:text-3xl">
			Verbraucher­streit­beilegung/Universal­schlichtungs­stelle
		</h2>
		<p class="mt-4 leading-relaxed">
			Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
			Verbraucherschlichtungsstelle teilzunehmen.
		</p>
	</section>

	<section>
		<h2 class="title-gradient text-2xl font-black tracking-[-0.02em] uppercase sm:text-3xl">
			Bildernachweis
		</h2>
		<p class="mt-4 leading-relaxed">
			Die Bilder, Fotos und Grafiken auf dieser Webseite sind urheberrechtlich geschützt.
		</p>
		<p class="mt-4 leading-relaxed">
			Die Bilderrechte liegen bei den folgenden Fotografen und Unternehmen:
		</p>
		<ul class="mt-4 list-disc space-y-2 pl-6 leading-relaxed">
			<li>Discord Inc.</li>
			<li>YouTube LLC.</li>
			<li>Twitch</li>
			<li>GitHub Inc.</li>
			<li>Twitter Inc.</li>
			<li><a href="https://triolution.de">Triolution GmbH / TopDiscoShow</a></li>
			<li><a href="https://instagram.com/fotograf.und.so">Joel Abraham</a></li>
			<li><a href="https://enerparc.de">ENERPARC AG</a></li>
		</ul>
		<p class="mt-4 leading-relaxed">Alle Texte sind urheberrechtlich geschützt.</p>
	</section>
</PageContent>
