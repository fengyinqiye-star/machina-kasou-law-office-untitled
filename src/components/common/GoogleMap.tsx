export default function GoogleMap() {
  return (
    <div className="w-full aspect-video rounded-sm overflow-hidden">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.828030551774!2d139.76454931525862!3d35.68124038019432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188bfbd89f700b%3A0x277c49ba34ed38!2z5Li444OO5YaF44OT44Or!5e0!3m2!1sja!2sjp!4v1710000000000!5m2!1sja!2sjp"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Kasou Law Office - Google Maps"
      />
    </div>
  );
}
