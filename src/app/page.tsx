import Image from "next/image"
import { Countdown } from "@/components/countdown"
import { MusicPlayer } from "@/components/music-player"
import { RSVPButton } from "@/components/rsvp-button"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Calendar, Clock, MapPin, Heart, Camera } from "lucide-react"
import { Gallery } from "@/components/gallery"

export default function Home() {
  // Fecha de la boda: 21 de junio 2025 a las 6 pm hora Honduras
  const weddingDate = new Date("2025-06-21T18:00:00-06:00")

  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-background.jpg"
            alt="Bryan y Genesis"
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-white/30 backdrop-blur-sm z-10"></div>

        <div className="container mx-auto px-4 z-20 text-center">
          <ScrollReveal>
            <h3 className="font-serif text-xl md:text-2xl text-rose-700 mb-4">Nos casamos</h3>
            <h1 className="font-dancing text-5xl md:text-7xl lg:text-8xl text-rose-800 mb-6">Bryan & Genesis</h1>
            <p className="font-serif text-xl md:text-2xl text-rose-700 mb-8">
              21 de Junio, 2025 • Villa Mari, Trujillo
            </p>
            <Countdown targetDate={weddingDate} />
          </ScrollReveal>
        </div>

        <div className="absolute bottom-10 left-0 right-0 flex justify-center z-20 animate-bounce">
          <a href="#fecha" className="text-rose-800 hover:text-rose-600 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </a>
        </div>
      </section>

      {/* Fecha y Lugar */}
      <section id="fecha" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="font-dancing text-4xl md:text-5xl text-center text-rose-800 mb-12">Nuestra Boda</h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Calendar className="w-12 h-12 text-rose-600" />
                </div>
                <h3 className="font-serif text-xl text-rose-800 mb-2">Fecha</h3>
                <p className="text-rose-700">21 de Junio, 2025</p>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Clock className="w-12 h-12 text-rose-600" />
                </div>
                <h3 className="font-serif text-xl text-rose-800 mb-2">Hora</h3>
                <p className="text-rose-700">6:00 PM</p>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <MapPin className="w-12 h-12 text-rose-600" />
                </div>
                <h3 className="font-serif text-xl text-rose-800 mb-2">Lugar</h3>
                <p className="text-rose-700">Villa Mari, Trujillo, Colón, Honduras</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Nuestra Historia */}
      <section className="py-20 bg-rose-50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="font-dancing text-4xl md:text-5xl text-center text-rose-800 mb-12">Nuestra Historia</h2>

            <div className="flex flex-col md:flex-row items-center max-w-5xl mx-auto">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <div className="relative h-max w-full rounded-lg overflow-hidden shadow-xl ">
                  <Image src="https://res.cloudinary.com/djluqrprg/image/upload/f_auto,q_auto/v1/boda/r19ea5pdxqyabo0h5wx1" width={500} height={400} alt="Bryan y Genesis"  className="object-cover" />
                </div>
              </div>

              <div className="md:w-1/2">
                <p className="text-rose-700 leading-relaxed mb-6">
                  El amor verdadero no es el que te hace sonreír por un momento, sino el que te hace sonreír toda la
                  vida. Así comenzó nuestra historia, con sonrisas que se convirtieron en un amor que durará para
                  siempre.
                </p>
                <p className="text-rose-700 leading-relaxed">
                  Después de años compartiendo sueños, risas y momentos inolvidables, hemos decidido dar el siguiente
                  paso en nuestro camino juntos. Nos encantaría que nos acompañaras en este día tan especial para
                  nosotros.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>


      {/* Galería de Fotos */}
        <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="font-dancing text-4xl md:text-5xl text-center text-rose-800 mb-12">
              Nuestra Galería de Fotos
            </h2>
            <div className="flex justify-center mb-8">
              <Camera className="w-12 h-12 text-rose-600" />
            </div>
            <p className="text-rose-700 text-center max-w-2xl mx-auto mb-12">
              Algunos de nuestros momentos más especiales juntos. Cada foto cuenta una historia de nuestro amor.
            </p>
            <div className="max-w-6xl mx-auto">
              <Gallery />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Itinerario */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="font-dancing text-4xl md:text-5xl text-center text-rose-800 mb-12">Itinerario</h2>

            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-rose-200 hidden md:block"></div>

                <div className="relative z-10 mb-12">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-rose-100 rounded-full h-12 w-12 flex items-center justify-center border-4 border-white shadow-md">
                      <span className="text-rose-600 font-serif">1</span>
                    </div>
                    <div className="ml-6">
                      <h3 className="font-serif text-xl text-rose-800 mb-1">Ceremonia</h3>
                      <p className="text-rose-700">6:00 PM - Capilla Villa Mari</p>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 mb-12">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-rose-100 rounded-full h-12 w-12 flex items-center justify-center border-4 border-white shadow-md">
                      <span className="text-rose-600 font-serif">2</span>
                    </div>
                    <div className="ml-6">
                      <h3 className="font-serif text-xl text-rose-800 mb-1">Cóctel</h3>
                      <p className="text-rose-700">7:00 PM - Jardín Principal</p>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 mb-12">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-rose-100 rounded-full h-12 w-12 flex items-center justify-center border-4 border-white shadow-md">
                      <span className="text-rose-600 font-serif">3</span>
                    </div>
                    <div className="ml-6">
                      <h3 className="font-serif text-xl text-rose-800 mb-1">Cena</h3>
                      <p className="text-rose-700">8:00 PM - Salón Principal</p>
                    </div>
                  </div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-rose-100 rounded-full h-12 w-12 flex items-center justify-center border-4 border-white shadow-md">
                      <span className="text-rose-600 font-serif">4</span>
                    </div>
                    <div className="ml-6">
                      <h3 className="font-serif text-xl text-rose-800 mb-1">Fiesta</h3>
                      <p className="text-rose-700">9:00 PM - Salón Principal</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Frases de Amor */}
      <section className="py-20 bg-rose-50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="font-dancing text-4xl md:text-5xl text-center text-rose-800 mb-12">Frases de Amor</h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex justify-center mb-4">
                  <Heart className="w-8 h-8 text-rose-500" />
                </div>
                <p className="text-rose-700 italic text-center">
                  &quot;El amor no se trata de mirarse el uno al otro, sino de mirar juntos en la misma dirección.&quot;
                </p>
                <p className="text-rose-600 text-center mt-4 font-serif">- Antoine de Saint-Exupéry</p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex justify-center mb-4">
                  <Heart className="w-8 h-8 text-rose-500" />
                </div>
                <p className="text-rose-700 italic text-center">
                  &quot;En tus brazos, he encontrado un hogar; en tu corazón, he encontrado amor; en tu alma, he encontrado a
                  mi mejor amigo.&quot;
                </p>
                <p className="text-rose-600 text-center mt-4 font-serif">- Anónimo</p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex justify-center mb-4">
                  <Heart className="w-8 h-8 text-rose-500" />
                </div>
                <p className="text-rose-700 italic text-center">
                  &quot;Contigo aprendí que el amor no se trata de encontrar a alguien con quien vivir, sino de encontrar a
                  alguien sin quien no puedes vivir.&quot;
                </p>
                <p className="text-rose-600 text-center mt-4 font-serif">- Anónimo</p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex justify-center mb-4">
                  <Heart className="w-8 h-8 text-rose-500" />
                </div>
                <p className="text-rose-700 italic text-center">
                  &quot;El amor es como el viento, no puedes verlo pero puedes sentirlo.&quot;
                </p>
                <p className="text-rose-600 text-center mt-4 font-serif">- Nicholas Sparks</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Reproductor de Música */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="font-dancing text-4xl md:text-5xl text-center text-rose-800 mb-12">Nuestra Canción</h2>

            <div className="max-w-2xl mx-auto">
              <MusicPlayer />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Código de Vestimenta y Reglas */}
      <section className="py-20 bg-rose-50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="font-dancing text-4xl md:text-5xl text-center text-rose-800 mb-12">
              Información Importante
            </h2>

            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="font-serif text-2xl text-rose-800 mb-6 text-center">Código de Vestimenta</h3>
                <p className="text-rose-700 text-center mb-4">Formal</p>
                <div className="flex justify-center space-x-8 mt-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-800 rounded-full mx-auto mb-2"></div>
                    <p className="text-rose-700">Caballeros</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-rose-300 rounded-full mx-auto mb-2"></div>
                    <p className="text-rose-700">Damas</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="font-serif text-2xl text-rose-800 mb-6 text-center">Consideraciones</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-rose-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <p className="text-rose-700">La ceremonia comenzará puntualmente a las 6:00 PM.</p>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-rose-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <p className="text-rose-700">
                      Hemos preparado una celebración íntima para adultos. Agradecemos su comprensión al asistir sin
                      niños.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-rose-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <p className="text-rose-700">Por favor, confirma tu asistencia antes del 21 de mayo de 2025.</p>
                  </li>
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Ubicación */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="font-dancing text-4xl md:text-5xl text-center text-rose-800 mb-12">Ubicación</h2>

            <div className="max-w-4xl mx-auto">
              <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl mb-8">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d123019.99214985897!2d-86.02393087776903!3d15.91726324827251!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f69a7a846d67b7d%3A0x4d5b9b7d38c9c1a9!2sTrujillo%2C%20Honduras!5e0!3m2!1ses!2ses!4v1716232063121!5m2!1ses!2ses"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                ></iframe>
              </div>

              <div className="text-center">
                <h3 className="font-serif text-xl text-rose-800 mb-2">Villa Mari</h3>
                <p className="text-rose-700 mb-6">Trujillo, Colón, Honduras</p>
                <a
                  href="https://maps.app.goo.gl/example"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-rose-600 text-white rounded-full hover:bg-rose-700 transition-colors"
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  Ver en Google Maps
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Confirmación de Asistencia */}
      <section className="py-20 bg-rose-100">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="font-dancing text-4xl md:text-5xl text-center text-rose-800 mb-6">
              Confirmación de Asistencia
            </h2>
            <p className="text-rose-700 text-center max-w-2xl mx-auto mb-12">
              Nos encantaría contar con tu presencia en nuestro día especial. Por favor, confirma tu asistencia antes
              del 21 de mayo de 2025.
            </p>

            <div className="flex justify-center">
              <RSVPButton />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-dancing text-3xl text-rose-800 mb-4">Bryan & Genesis</h2>
          <p className="text-rose-700 mb-6">21 de Junio, 2025</p>
          <p className="text-rose-600">&copy; {new Date().getFullYear()} • Con amor, Bryan y Genesis</p>
        </div>
      </footer>
    </main>
  )
}
