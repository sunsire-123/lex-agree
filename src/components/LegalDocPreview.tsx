import React from 'react';
import './LegalDocPreview.css'; // Make sure you created this file!

export interface LegalDocData {
  state: string;
  date: string;
  sellerName: string;
  buyerName: string;
  propertyValue: string;
  apartmentCost: string;
  apartmentName: string;
  panCard: string;
}

interface Props {
  data: LegalDocData;
  focusedField?: string;
}

const Highlight: React.FC<{ children: React.ReactNode; id?: string }> = ({ children, id }) => (
  <span id={id} className="text-emerald-700 font-bold border-b border-emerald-200 bg-emerald-50 px-1 rounded transition-colors duration-300">
    {children}
  </span>
);

const LegalDocPreview: React.FC<Props> = ({ data, focusedField }) => {
  const {
    state,
    date,
    sellerName,
    buyerName,
    propertyValue,
    apartmentCost,
    apartmentName,
    panCard
  } = data;

  React.useEffect(() => {
    if (focusedField) {
      const element = document.getElementById(`preview-${focusedField}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Add a temporary flash effect
        element.classList.add('ring-2', 'ring-emerald-500', 'ring-offset-2');
        setTimeout(() => element.classList.remove('ring-2', 'ring-emerald-500', 'ring-offset-2'), 1000);
      }
    }
  }, [focusedField]);
  return (
    <div className="legal-doc-container bg-white p-8 max-w-4xl mx-auto shadow-none" id="legal-document">
      {/* Stamp Image - Placeholder until generated image is moved/linked */}
      <div className="w-full mb-8 border-b-2 border-gray-300 pb-4 flex justify-center">
        <img src="/artifacts/government_stamp.png" alt="Government Stamp" className="max-h-32 object-contain opacity-90" onError={(e) => {
          // Fallback if image fails (e.g. during dev/before generation)
          (e.target as HTMLImageElement).style.display = 'none';
          (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="text-center font-serif text-gray-500 border-2 border-gray-300 p-4 rounded border-dashed w-full h-32 flex items-center justify-center bg-gray-50">GOVERNMENT CHETAK STAMP SPACE</div>';
        }} />
      </div>

      <h1>SALE CUM CONSTRUCTION AGREEMENT</h1>

      <p><strong>THIS SALE CUM CONSTRUCTION AGREEMENT</strong> ("Agreement") IS ENTERED INTO AT <Highlight id="preview-state">{state || "CHENNAI"}</Highlight> ON THIS THE <Highlight id="preview-date">{date ? new Date(date).getDate() : "_____"}</Highlight> DAY OF {date ? new Date(date).toLocaleString('default', { month: 'long' }) : "__________"}, {date ? new Date(date).getFullYear() : "202_"}.</p>

      <h2>BY</h2>

      <div className="party-block">
        <p><strong><Highlight id="preview-sellerName">{sellerName || "LANDOWNER NAME/COMPANY"}</Highlight></strong>, a company incorporated under the provisions of the Companies Act, having its Registered Office at <span className="placeholder">_____________________________________</span>, represented by its lawful Power Agent <strong>[PROMOTER NAME/COMPANY]</strong>.</p>
        <p>Hereinafter called and referred to as the <strong>"Landowner"</strong> (which expression shall unless repugnant to the context or meaning thereof be deemed to mean and include its legal representatives, successor-in-office, executors, receivers, attorneys, administrators and permitted assignees etc.) of the <strong>First Part</strong>;</p>
      </div>

      <div className="center-bold">AND</div>

      <div className="party-block">
        <p><strong>[PROMOTER NAME/COMPANY]</strong>, a company incorporated under the provisions of the Companies Act, having its Registered Office at <span className="placeholder">_____________________________________</span>, represented by its Authorized Signatory.</p>
        <p>Hereinafter called and referred to as the <strong>"Promoter"</strong>, (which expression shall unless repugnant to the context or meaning thereof be deemed to mean and include its legal representatives, successor-in-office, executors, receivers, attorneys, administrators and permitted assignees) of the <strong>Second Part</strong>;</p>
      </div>

      <div className="center-bold">AND</div>

      <div className="party-block">
        <p><strong>[CONFIRMING PARTY NAME]</strong>, a Limited Liability Partnership/Company, having its Registered Office at <span className="placeholder">_____________________________________</span>.</p>
        <p>Hereinafter called and referred to as the <strong>"Confirming Party"</strong> (which expression shall unless repugnant to the context or meaning thereof be deemed to mean and include its legal representatives, successor-in-office, executors, receivers, attorneys, administrators and permitted assignees etc.) of the <strong>Third Part</strong>.</p>
      </div>

      <div className="center-bold">TO AND IN FAVOUR OF</div>

      <div className="party-block">
        <p><strong><Highlight id="preview-buyerName">{buyerName || "ALLOTTEE NAME(S)"}</Highlight></strong>, aged about <span className="placeholder">____</span> years, residing at <span className="placeholder">____________________________________________________________________</span>. <strong>(PAN: <Highlight id="preview-panCard">{panCard || "____________________"}</Highlight>)</strong></p>
        <p>Hereinafter called and referred to as the <strong>"ALLOTTEE(S)"</strong> (which expression shall unless repugnant to the context or meaning thereof be deemed to mean and include his/her/their legal heirs, executors, receivers, attorneys, administrators, legal representatives, successors-in-interest, nominees and permitted assignees etc.) of the <strong>Fourth Part</strong>;</p>
      </div>

      <p>The Landowner, Promoter, Confirming Party and the Allottee(s) shall hereinafter collectively referred to as "Parties".</p>

      <hr />

      <h3>WHEREAS:</h3>

      <ul className="recital-list">
        <li><span className="recital-label">A.</span> The Landowner herein is the sole and absolute owner of the lands admeasuring about 9 Acres and 9.25 Cents [i.e. 40168 Sq.mt] situated at Ambattur Village, Ambattur Taluk, Chennai District, morefully described in the Schedule 'A' hereunder;</li>

        <li><span className="recital-label">B.</span> Originally, the previous owners possessed the property comprised in Survey Nos.501, 512/1, 512/2, 515/2 518, 519, 520, 521/1, 521/2, 524/1 & 524/2 along with other properties.</li>

        <li><span className="recital-label">C.</span> The Landowner Company was incorporated and the schedule property was included as assets of the said company.</li>

        <li><span className="recital-label">D.</span> The Partners of the firm decided to convert the Partnership Firm to Private Limited Company and on the basis of dividing the profit/loss, all assets of the Firm have now become the assets of the Landowner herein.</li>

        <li><span className="recital-label">E.</span> Subsequently, exchange deeds were executed with the Tamil Nadu Housing Board regarding specific portions of land to form approach roads and development, registered as Document No. 7405/2015.</li>

        <li><span className="recital-label">F.</span> The Landowner has executed an Agreement of Sale registered as Document No. 5075/2019, in favour of the Confirming Party herein in respect of the Schedule 'A' Property. Hence, the Confirming Party is included in this Agreement as abundant caution.</li>

        <li><span className="recital-label">G.</span> The Landowner has empowered the Promoter herein as their lawful power attorney agent vide a Deed of General Power of Attorney registered as Document No.5076/2019, to develop, sell, and execute agreements in respect of the Schedule 'A' Property.</li>

        <li><span className="recital-label">H.</span> The Promoter intended to develop the land into a Residential Project. Portions of land (OSR, Road widening) were gifted to the authority vide Gift Deed dated 05.12.2019.</li>

        <li><span className="recital-label">I.</span> The Promoter proposed sub-division of the Schedule 'A' Property into two plots: Plot-A (6336 Sq.mt) and Plot-B (29,335 Sq.mt) vide Letter No. L1/3524/2020 issued by CMDA.</li>

        <li><span className="recital-label">J.</span> Further gifts of land for Link Road (248.23 Sq.mt) and TNEB reservation (1050 Sq.mt) were made, described in Schedule 'B'.</li>

        <li><span className="recital-label">K.</span> Thus the Landowner has an extent of 34,392.77 Sq.mt (Schedule 'C'), apportioned as:
          <br />(i) 6336 Sq.Mt available for future use in Plot-A (Schedule 'D').
          <br />(ii) 28,056.77 Sq.Mt available for development in Plot-B (Schedule 'E').
        </li>

        <li><span className="recital-label">L.</span> The Promoter has obtained requisite sanctions and approvals for construction vide Planning Permit No.C/PP/MSB/37 (S-01 to S-31)/2020 and Building Permit No. CEBA/WDCN07/00415/2020.</li>

        <li><span className="recital-label">M.</span> The Project is registered under RERA with Registration No.TN/02/Building/0423/2020 in the name and style of "Casagrand Athens" ("Project").</li>

        <li><span className="recital-label">N.</span> The Allottee(s) is/are satisfied with the title and statutory compliance pertaining to the said Project.</li>

        <li><span className="recital-label">O.</span> The Allottee(s) has/have intended to purchase the residential unit bearing <strong><Highlight id="preview-apartmentName">{apartmentName || "Apartment No. J1005"}</Highlight></strong> in Tenth Floor, Block - 3, measuring about 944 Sq.ft. carpet area [comprising in 1530 Sq.ft. Super Built-up area] along with One Covered Car Park together with 375 Sq.ft undivided share of land (Schedule 'F' Property) for a Total Sale Consideration of <strong>Rs.<Highlight id="preview-apartmentCost">{apartmentCost || "96,02,320/-"}</Highlight></strong> {propertyValue ? <>(Market Value: Rs.<Highlight id="preview-propertyValue">{propertyValue}</Highlight>)</> : ""} (Rupees {apartmentCost ? "..." : "Ninety Six Lakh Two Thousand Three Hundred and Twenty only"}).</li>

        <li><span className="recital-label">P.</span> The Landowner and the Promoter are fully competent to enter into this Agreement.</li>

        <li><span className="recital-label">Q.</span> The Parties have decided to reduce the terms and conditions mutually agreed upon into writing.</li>
      </ul>

      <h3>NOW THIS AGREEMENT OF SALE CUM CONSTRUCTION WITNESSETH AS FOLLOWS:</h3>

      <ol className="clause-list">
        <li><span className="clause-number">1.</span> The Landowner/Promoter herein offer to sell, transfer and convey Schedule 'F' Property in favour of the Allottee(s) for a sum of <strong>Rs.<Highlight id="preview-apartmentCost-2">{apartmentCost || "96,02,320/-"}</Highlight></strong> towards total sale consideration. The Allottee(s) agreed and accept for the same free from all encumbrances.</li>

        <li><span className="clause-number">2.</span> The Allottee(s) has/have paid an advance. The balance sale consideration shall be paid by the Allottee(s) within 35 days from the date of booking. The Landowner/Promoter is entitled to charge interest (SBI highest Marginal Cost of Lending Rate plus 2%) on delayed payments.</li>

        <li><span className="clause-number">3.</span> The Allottee(s) has/have committed to an additional payment of <strong>Rs.50,000/-</strong> towards the corpus fund. This fund is to be utilized for maintenance and amenities.</li>

        <li><span className="clause-number">4.</span> The Allottee(s) shall not assign or transfer interest under this Agreement before registration of the sale deed without prior written consent.</li>

        <li><span className="clause-number">5.</span> The Landowner/Promoter represents there is an existing charge for project finance. The Promoter shall release the Schedule 'F' Property from the charge and obtain a 'No objection certificate' before the execution of the Sale Deed.</li>

        <li><span className="clause-number">6.</span> The Landowner/Promoter shall not enter into any agreement in respect of Schedule 'F' with any other person during the subsistence of this agreement.</li>

        <li><span className="clause-number">7.</span> All payments shall be paid directly by the Allottee(s) or their bank to the Landowner/Promoter. The Allottee(s) is liable for payment regardless of loan disbursement.</li>

        <li><span className="clause-number">8.</span> Possession will be handed over subject to receipt of the entire consideration. The Landowner/Promoter has the first charge or lien on the premises for unpaid balances.</li>

        <li><span className="clause-number">9.</span> Assignment to a third party requires prior written permission and an Assignment fee of 10% of the Total Price.</li>

        <li><span className="clause-number">10.</span> Execution and registration of the Sale Deed shall be completed only on receipt of all monies due.</li>

        <li><span className="clause-number">11.</span> All stamp duty and registration charges shall be borne by the Allottee(s).</li>

        <li><span className="clause-number">12.</span> In the event of default by the Allottee(s), the Landowner/Promoter is entitled to cancel this Agreement after 30 days notice. Refund will be made within 90 days subject to a deduction of 10% of total consideration.</li>

        <li><span className="clause-number">13.</span> All payments shall be made by Cheques, DD, or RTGS. Allottee(s) undertakes to pay any taxes imposed by the Government.</li>

        <li><span className="clause-number">14.</span> The Landowner/Promoter is not responsible for third-party remittances.</li>

        <li><span className="clause-number">15.</span> <strong>Maintenance:</strong> The Landowner/Promoter shall oversee maintenance at no extra cost for the first six months from the date of delivery.</li>

        <li><span className="clause-number">16.</span> After the initial period, an independent maintenance agreement may be executed with the Promoter or nominated agency.</li>

        <li><span className="clause-number">17.</span> The Allottee(s) shall ensure an "Owners Association" is formed.</li>

        <li><span className="clause-number">18.</span> Subsequent to taking over by the Owners Association, the Allottee(s) shall pay all costs/charges on a pro-rata basis.</li>

        <li><span className="clause-number">19.</span> Defaults in payment of maintenance charges may result in deprivation of rights to enjoy common facilities and display of name on the notice board.</li>

        <li><span className="clause-number">20.</span> The Project is constructed as per the approved building plan.</li>

        <li><span className="clause-number">21.</span> The Landowner/Promoter shall rectify structural defects brought to notice within 5 years from completion (excluding normal wear and tear, acts of god, or negligence by Allottee). Structural defects do not include plastering hairline cracks.</li>

        <li><span className="clause-number">22.</span> Common areas shall be enjoyed in concurrence with other owners. Maintenance costs are shared.</li>

        <li><span className="clause-number">23.</span> Service lines, ducts, and watercourses are common to all owners.</li>

        <li><span className="clause-number">24.</span> Allottee(s) shall adhere to maintenance and usage guidelines.</li>

        <li><span className="clause-number">25.</span> No alterations to structure, design, or colour affecting the exterior or stability are permitted.</li>

        <li><span className="clause-number">26.</span> No encroachment or commercial trade in common areas or Schedule 'F' property. No storage of hazardous materials or anti-social activities.</li>

        <li><span className="clause-number">27.</span> Allottee(s) shall cooperate for the operation and maintenance of essential amenities.</li>

        <li><span className="clause-number">28.</span> Common areas shall not be used for commercial purposes.</li>

        <li><span className="clause-number">29.</span> Allottee(s) agrees to sign documents required for infrastructural facilities (water, electricity, etc.).</li>

        <li><span className="clause-number">30.</span> No decoration of the exterior or temporary structures allowed without Association permission.</li>

        <li><span className="clause-number">31.</span> No alterations to structural features (RCC, columns, walls) allowed.</li>

        <li><span className="clause-number">32.</span> Apartment to be used for residential purposes only.</li>

        <li><span className="clause-number">33.</span> No nuisance to other occupants.</li>

        <li><span className="clause-number">34.</span> Supporting common walls and roofs are maintained in common.</li>

        <li><span className="clause-number">35.</span> Parking only in the specific allotted space.</li>

        <li><span className="clause-number">36.</span> No partition of the undivided share of land.</li>

        <li><span className="clause-number">37.</span> Allottee(s) is liable for property tax and other taxes after sale deed execution.</li>

        <li><span className="clause-number">38.</span> Only electrical points provided. Fixtures (fans, bulbs) are Allottee's cost.</li>

        <li><span className="clause-number">39.</span> Project name "Casagrand Athens" shall not be changed. Promoter retains rights to display name and logo.</li>

        <li><span className="clause-number">40.</span> Allottee(s) accepts full knowledge of applicable laws and agrees to comply with requirements.</li>

        <li><span className="clause-number">41.</span> Unrestricted access for maintenance agencies to common areas and, with notice, to the Apartment for defect rectification.</li>

        <li><span className="clause-number">42.</span> Service areas and basements reserved for maintenance use only.</li>

        <li><span className="clause-number">43.</span> Notices served by Registered Post/Email/Courier to addresses in this agreement are deemed served. Changes in address must be informed.</li>

        <li><span className="clause-number">44.</span> For joint Allottees, communication to the first name is sufficient.</li>

        <li><span className="clause-number">45.</span> Failure to enforce provisions is not a waiver.</li>

        <li><span className="clause-number">46.</span> Severability clause for void provisions.</li>

        <li><span className="clause-number">47.</span> Amendments only through written consent.</li>

        <li><span className="clause-number">48.</span> & <strong>50.</strong> Governed by laws of India.</li>

        <li><span className="clause-number">49.</span> This Agreement constitutes the entire agreement and supersedes previous understandings.</li>

        <li><span className="clause-number">51.</span> Disputes settled amicably or through the adjudicating officer under the Act.</li>

        <li><span className="clause-number">52.</span> Exclusive jurisdiction: Courts in Chennai.</li>
      </ol>

      <hr />

      <h3>SCHEDULE "A" <br /> [Total Property]</h3>
      <p>All that piece and parcel of the land admeasuring about 9 Acres 92.5 Cents situated at Ambattur Village, Ambattur Taluk, Chennai District and comprised in Survey numbers 500/1(part), 500/2(part), 513/1(part), 513/2(part), 501, 512/1, 512/2, 515/2, 518, 519, 520(part), 521/1, 521/2(part), 524(part). Total extent: 40168 Sq. mt.</p>

      <h3>SCHEDULE "B" <br /> (Area gifted towards OSR, Road widening, Link Road and reserved for TNEB)</h3>
      <p>Land totally admeasuring about 5,623.23 Sq. Mt including OSR, Road Widening, Link Road, and TNEB reservation.</p>

      <h3>SCHEDULE "C"</h3>
      <p>Remaining land area available: 34,392.77 Sq.mt.</p>

      <h3>SCHEDULE "D"</h3>
      <p>Land apportioned for Future use in Plot-A: 6,336 Sq.mt.</p>

      <h3>SCHEDULE "E"</h3>
      <p>Land available for development in Plot-B: 28,056.77 Sq.mt.</p>

      <h3>SCHEDULE "F" <br /> (Property hereby agreed to be conveyed to the Allottee(s))</h3>
      <p>A residential unit bearing <strong><Highlight id="preview-apartmentName-2">{apartmentName || "Apartment No. J1005"}</Highlight></strong> in Tenth Floor, Block - 3, measuring about 944 Sq.ft. carpet area [1530 Sq.ft. Super Built-up area] along with One Covered Car Park together with 375 Sq.ft. undivided share of land in the Residential Project "Casagrand Athens" situated at Ambattur Village.</p>

      <hr />

      <h3>SPECIFICATIONS</h3>
      <table className="legal-table">
        <tbody>
          <tr>
            <td><strong>1. STRUCTURE</strong></td>
            <td>RCC Framed Structure (Seismic Zone 3). Masonry: 200mm external, 100mm internal. Floor height: 2.95m. Anti-termite treatment included.</td>
          </tr>
          <tr>
            <td><strong>2. WALL FINISH</strong></td>
            <td>Internal: Putty + Primer + Emulsion. Ceiling: OBD. Exterior: Emulsion. Bathroom: Glazed/matte tiles up to false ceiling. Kitchen: Tiles 600mm above counter.</td>
          </tr>
          <tr>
            <td><strong>3. FLOOR FINISH</strong></td>
            <td>Living/Dining/Bedrooms/Kitchen: Vitrified tiles (800x800mm). Bathrooms/Balcony: Anti-skid ceramic tiles (300x300mm).</td>
          </tr>
          <tr>
            <td><strong>4. KITCHEN & DINING</strong></td>
            <td>Granite platform, SS/Quartz sink, chimney/water purifier points.</td>
          </tr>
          <tr>
            <td><strong>5. BATHROOMS</strong></td>
            <td>Sanitary: Jaguar/Roca or equivalent. Wall-mounted/Floor-mounted WC, health faucet, diverter, rain shower/overhead shower.</td>
          </tr>
          <tr>
            <td><strong>6. JOINERY</strong></td>
            <td>Main Door: African teak wood frame, veneer finish, digital lock (Yale/Dorma). Bedroom/Bathroom Doors: Skin shutters/moulded skin doors. Windows: UPVC.</td>
          </tr>
          <tr>
            <td><strong>7. ELECTRICAL</strong></td>
            <td>3 Phase supply. MCB/ELCB. Modular switches (Anchor/Schneider). FRLS copper wires. Points for AC, TV, Data, Geyser.</td>
          </tr>
        </tbody>
      </table>

      <h3>AMENITIES</h3>
      <table className="legal-table">
        <thead>
          <tr>
            <th>Outdoor Amenities</th>
            <th>Features & Entertainment</th>
            <th>Clubhouse & Indoor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              Tennis, Basketball, Badminton, Futsal, Cricket Nets<br />
              Swimming Pools (Adults & Kids)<br />
              Aqua Gym, Jacuzzi<br />
              Children's Play Area, Tot-Lot<br />
              Outdoor Gym, Skating Rink
            </td>
            <td>
              Amphitheater<br />
              Barbeque Lawn<br />
              Outdoor Party Lawn<br />
              Bamboo Drive, Green Pavilions<br />
              Hammock Garden
            </td>
            <td>
              Gym, Digital Workout, TRX<br />
              Yoga/Zumba, Squash Court<br />
              Indoor Games (TT, Snooker)<br />
              Mini Theatre, Banquet Hall<br />
              Business Center, Guest Room<br />
              Steam, Sauna, Spa
            </td>
          </tr>
        </tbody>
      </table>

      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line">SIGNED BY THE ALLOTTEE(S)</div>
        </div>
        <div className="signature-block">
          <div className="signature-line">SIGNED BY THE LANDOWNER/PROMOTER</div>
        </div>
        <div className="signature-block">
          <div className="signature-line">WITNESS 1</div>
        </div>
        <div className="signature-block">
          <div className="signature-line">WITNESS 2</div>
        </div>
      </div>

      <p style={{ fontSize: '10pt', color: '#666', textAlign: 'right' }}>Drafted By: S. Sathish Kumar, Advocate.</p>
    </div>
  );
};

export default LegalDocPreview;